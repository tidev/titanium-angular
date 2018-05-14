import { PlatformLocation } from '@angular/common';
import { ComponentRef, Injector } from '@angular/core';

import { HistoryStack, LocationState } from '../../common';
import { DeviceEnvironment } from '../../services';
import { NavigationAwareRouteReuseStrategy } from '../NavigationAwareRouteReuseStrategy';
import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { DetachedRouteHandle } from '@angular/router';

/**
 * A navigator for handling navigation inside the Tabs of a TabGroup.
 * 
 * This navigator can only open Ti.UI.Window views. Opened views will be stored
 * in a stack. Each tab has its own window stack, to allow individual back 
 * navigation.
 * 
 * The router state will also be recorded per tab, so switching between tabs
 * always restores the appropiarte routing history.
 */
export class TabGroupNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.TabGroup';

    static supportedViews: Set<string> = new Set(['Ti.UI.Window']);

    /**
     * Provides access to the current device environment
     */
    private device: DeviceEnvironment;

    /**
     * Titanium specific implementation of PlatformLocation
     */
    private location: PlatformLocation;

    /**
     * The root tab group view
     */
    private tabGroup: Titanium.UI.TabGroup;

    /**
     * Map of tabs and their window stack.
     */
    private windowStacks: Map<Titanium.UI.Tab, Array<Titanium.UI.Window>> = new Map();

    /**
     * Router state manager that updates the internal router history and states
     * when a tab is switched.
     */
    private routerStateManager: RouterStateManager;

    constructor(tabGroup: Titanium.UI.TabGroup) {
        super();

        if (tabGroup.apiName !== 'Ti.UI.TabGroup') {
            throw new Error('The TabGroupNavigator can only handle navigation for Ti.UI.TabGroup');
        }

        this.tabGroup = tabGroup;
    }

    initialize(): void {
        this.device = this._injector.get(DeviceEnvironment);
        this.location = this._injector.get(PlatformLocation);
        this.routerStateManager = new RouterStateManager(this._injector);

        this.tabGroup.addEventListener('focus', (event) => {
            if (event.previousIndex === -1 || !this.tabGroup.activeTab) {
                return;
            }
            
            this.routerStateManager.applySnapshot(this.tabGroup.activeTab);
        });
    }

    openRootWindow(): void {
        this.tabGroup.open();
    }

    closeRootWindow(): void {
        this.tabGroup.close();
    }

    open(view: Titanium.Proxy, options: NavigationOptions): void {
        view.addEventListener('close', this.onWindowClose.bind(this));
        const activeTab = this.tabGroup.activeTab;
        let windowStack = this.windowStacks.get(activeTab);
        if (!windowStack) {
            windowStack = [];
            this.windowStacks.set(activeTab, windowStack);
        }
        windowStack.push(<any>view);
        this.tabGroup.activeTab.open(<any>view);

        this.routerStateManager.updateRouterStateSnapshot(this.tabGroup.activeTab);
    }

    canGoBack(): boolean {
        const activeTab = this.tabGroup.activeTab;
        let windowStack = this.windowStacks.get(activeTab);
        return windowStack && windowStack.length >= 1;
    }

    back(): void {
        const activeTab = this.tabGroup.activeTab;
        let windowStack = this.windowStacks.get(activeTab);
        if (!windowStack || windowStack.length === 0) {
            throw new Error('The currently active tab doesn\'t have any more windows to close, cannot go back.');
        }

        const window = windowStack.pop();
        window.removeEventListener('close', this.onWindowClose);
        if (this.device.runs('ios')) {
            this.tabGroup.activeTab.close(window);
        } else {
            window.close();
        }

        this.routerStateManager.updateRouterStateSnapshot(this.tabGroup.activeTab);
    }

    /**
     * Event handler for the 'close' event of windows in a tab's window stack.
     * 
     * This is used to track native navigation events and then update the internal
     * router states accordingly.
     * 
     * @param event 
     */
    onWindowClose(event: any): void {
        const window = <Titanium.UI.Window>event.source;
        window.removeEventListener('close', this.onWindowClose);
        
        this.nativeNavigationState.emit();
        this.location.back();
        this.routerStateManager.updateRouterStateSnapshot(this.tabGroup.activeTab);
    }
}

/**
 * A snapshot of internal router states.
 */
class RouterStateSnapshot {
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
        return this.historyStack.map(state => state.url).join('/');
    }
}

/**
 * A manager for the internal router states.
 * 
 * Saves and updates router state snapshots for each tab. Used to keep
 * track of the different router states in each tab.
 */
class RouterStateManager {
    /**
     * The Titanium history API shim.
     */
    historyStack: HistoryStack;

    /**
     * The used route reuse strategy.
     */
    routeReuseStrategy: NavigationAwareRouteReuseStrategy;

    /**
     * Map of tabs and their current router state snapshot.
     */
    private routerSnapshots: Map<Titanium.UI.Tab, RouterStateSnapshot> = new Map();

    /**
     * The routing snapshot when the tab group is opnened, used as the
     * initial snapshot for each tab.
     */
    private initalSnapshot: RouterStateSnapshot;

    /**
     * Constructs a new router state manager.
     * 
     * @param injector Injector of the router module
     */
    constructor(injector: Injector) {
        this.historyStack = injector.get(HistoryStack);
        this.routeReuseStrategy = <NavigationAwareRouteReuseStrategy>injector.get(NavigationAwareRouteReuseStrategy);
        this.initalSnapshot = this.createSnapshot();
    }

    /**
     * Updates the current router state snpashot for the given tab.
     * 
     * @param tab Tab to associate the current router state snapshot with. 
     */
    updateRouterStateSnapshot(tab: Titanium.UI.Tab) {
        const snapshot = this.createSnapshot();
        this.routerSnapshots.set(tab, snapshot);
        console.log(`Updated router snapshot for tab ${tab.title} to: ${snapshot}`);
    }

    /**
     * Applies the router states from the stored snapshot of the given tab.
     * 
     * @param tab Tab for which to look up and apply previously stored router states.
     */
    applySnapshot(tab: Titanium.UI.Tab) {
        if (!tab || tab.apiName !== 'Ti.UI.Tab') {
            throw new Error('Invalid tab received while trying to apply router snapshot after switching tab.');
        }

        let storedSnapshot = this.routerSnapshots.get(tab);
        if (!storedSnapshot) {
            storedSnapshot = this.initalSnapshot;
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

    /**
     * Creates a new router state snapshot from the current location history and detached
     * route handlers.
     * 
     * @return The created snpashot of the current router states.
     */
    private createSnapshot(): RouterStateSnapshot {
        const historySnapshot = this.historyStack.snapshotStack();
        const handlersSnapshot = this.routeReuseStrategy.snapshotDetachedRoutehandlers();
        return new RouterStateSnapshot(historySnapshot, handlersSnapshot);
    }

}