
import { Injector } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { RouterStateAdapterInterface, RouterStateSnapshotInterface } from 'titanium-navigator';

import { NavigationAwareRouteReuseStrategy } from '../NavigationAwareRouteReuseStrategy';
import { HistoryStack, LocationState } from '../../common';

/**
 * A snapshot of internal router states.
 */
class RouterStateSnapshot implements RouterStateSnapshotInterface {
  /**
   * Stack of location states.
   */
  historyStack: Array<LocationState>;

  /**
   * Map of detached route handlers.
   */
  detachedRouteHandles: Map<string, DetachedRouteHandle>;

  /**
   * Constructs a new router state snapshot.
   *
   * @param historyStack The location states stack
   * @param detachedRouteHandles Map of detached route handlers
   */
  constructor(historyStack: Array<LocationState>, detachedRouteHandles: Map<string, DetachedRouteHandle>) {
      this.historyStack = historyStack;
      this.detachedRouteHandles = detachedRouteHandles;
  }

  /**
   * Compares this router state snapshot against another one.
   *
   * @param other Other router state snapshot to compare against
   * @return True if both snapshots are equal, false if not.
   */
  isEqual(other: RouterStateSnapshot): boolean {
      if (this.historyStack.length !== other.historyStack.length) {
          return false;
      }

      for (let i = 0; i < this.historyStack.length; i++) {
          const state = this.historyStack[i];
          const otherState = other.historyStack[i];

          if (state.url !== otherState.url) {
              return false;
          }
      }

      return true;
  }

  /**
   * Returns a string representation of this router state snapshot.
   */
  toString() {
      return `RouterStateSnapshot {
  ${this.historyStack.map(state => state.url).join('\n  ')}
}`;
  }
}

export class RouterStateAdapter implements RouterStateAdapterInterface {
  private tabGroup: Titanium.UI.TabGroup;
  /**
   * The Titanium history API shim.
   */
  private historyStack: HistoryStack;

  /**
   * The used route reuse strategy.
   */
  private routeReuseStrategy: NavigationAwareRouteReuseStrategy;

  /**
   * Map of tabs and their current router state snapshot.
   */
  private routerSnapshots: Map<Titanium.UI.Tab, RouterStateSnapshot> = new Map();

  /**
   * The routing snapshot when the tab group is opnened, used as the
   * initial snapshot for each tab.
   */
  private initialSnapshot: RouterStateSnapshot;

  constructor(tabGroup: Titanium.UI.TabGroup, injector: Injector) {
    this.tabGroup = tabGroup;
    this.historyStack = injector.get(HistoryStack);
    this.routeReuseStrategy = <NavigationAwareRouteReuseStrategy>injector.get(NavigationAwareRouteReuseStrategy);
  }

  activate(): void {
    this.initialSnapshot = this.createSnapshot();
  }

  deactivate(): void {

  }

  updateRouterStateSnapshot(tab: Titanium.UI.Tab): void {
    const snapshot = this.createSnapshot();
    this.routerSnapshots.set(tab, snapshot);
    console.log(`Updated router snapshot for tab ${tab.title} to: ${snapshot}`);
  }

  /**
   * Applies the router states from the stored snapshot of the given tab.
   *
   * @param tab Tab to look up and apply previously stored router states.
   */
  applySnapshot(tab: Titanium.UI.Tab) {
    if (!tab || tab.apiName !== 'Ti.UI.Tab') {
      throw new Error('Invalid tab received while trying to apply router snapshot after switching tab.');
    }

    let storedSnapshot = this.routerSnapshots.get(tab);
    if (!storedSnapshot) {
      storedSnapshot = this.initialSnapshot;
      this.routerSnapshots.set(tab, storedSnapshot);
    }

    const currentSnapshot = this.createSnapshot();
    if (storedSnapshot.isEqual(currentSnapshot)) {
      console.log(`Router snapshot for tab ${tab.title} is equal to current snapshot, skipping restore.`);
      return;
    }

    console.log(`Restoring router snapshot for tab ${tab.title} to: ${storedSnapshot}`);

    this.historyStack.restoreStack(storedSnapshot.historyStack);
    this.routeReuseStrategy.restoreHandlers(storedSnapshot.detachedRouteHandles);
  }

  private createSnapshot(): RouterStateSnapshot {
    return new RouterStateSnapshot(
      this.historyStack.snapshotStack(),
      this.routeReuseStrategy.snapshotDetachedRoutehandlers()
    );
  }
}