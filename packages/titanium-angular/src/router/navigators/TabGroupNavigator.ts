import { PlatformLocation } from '@angular/common';
import { ComponentRef, Injector } from '@angular/core';

import { TitaniumPlatformLocation, HistoryStack, LocationState } from '../../common';
import { DeviceEnvironment } from '../../services';
import { NavigationAwareRouteReuseStrategy } from '../NavigationAwareRouteReuseStrategy';
import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { DetachedRouteHandle } from '@angular/router';

/**
 * @todo Make a snapshot of the current paths for each active tab to be be able recreate the paths upon tab switch
 */
export class TabGroupNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.TabGroup';

    protected supportedViews: Array<string> = ['Ti.UI.Window'];

    protected yieldNavigationViews: Array<string> = [];

    private device: DeviceEnvironment;

    private location: PlatformLocation;

    private tabGroup: Titanium.UI.TabGroup;

    private windowStacks: Map<Titanium.UI.Tab, Array<Titanium.UI.Window>> = new Map();

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

    back(): void {
        const activeTab = this.tabGroup.activeTab;
        let windowStack = this.windowStacks.get(activeTab);
        if (!windowStack || windowStack.length === 0) {
            throw new Error('The currently active tab doesn\'t have any more windows to close, cannot go back.');
        }

        const window = windowStack.pop();
        if (this.device.runs('ios')) {
            this.tabGroup.activeTab.close(window);
        } else {
            window.close();
        }

        this.routerStateManager.updateRouterStateSnapshot(this.tabGroup.activeTab);
    }

    onWindowClose(event: any): void {
        const window = <Titanium.UI.Window>event.source;
        window.removeEventListener('close', this.onWindowClose);
        this.nativeNavigationState.emit();
        this.location.back();
        this.routerStateManager.updateRouterStateSnapshot(this.tabGroup.activeTab);
    }
}

class RouterStateSnapshot {
    historyStack: Array<LocationState>;

    detachedRouteHandles: Map<string, DetachedRouteHandle>;

    constructor(historyStack: Array<LocationState>, detachedRouteHandles: Map<string, DetachedRouteHandle>) {
        this.historyStack = historyStack;
        this.detachedRouteHandles = detachedRouteHandles;
    }

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

    toString() {
        return this.historyStack.map(state => state.url).join('/');
    }
}

class RouterStateManager {

    historyStack: HistoryStack;

    routeReuseStrategy: NavigationAwareRouteReuseStrategy;

    private routerSnapshots: Map<Titanium.UI.Tab, RouterStateSnapshot> = new Map();

    private initalSnapshot: RouterStateSnapshot;

    constructor(injector: Injector) {
        this.historyStack = injector.get(HistoryStack);
        this.routeReuseStrategy = <NavigationAwareRouteReuseStrategy>injector.get(NavigationAwareRouteReuseStrategy);
        this.initalSnapshot = this.createSnapshot();
    }

    updateRouterStateSnapshot(tab: Titanium.UI.Tab) {
        const snapshot = this.createSnapshot();
        this.routerSnapshots.set(tab, snapshot);
        console.log(`Updated router snapshot for tab ${tab.title} to: ${snapshot}`);
    }

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

    private createSnapshot(): RouterStateSnapshot {
        const historySnapshot = this.historyStack.snapshotStack();
        const handlersSnapshot = this.routeReuseStrategy.snapshotDetachedRoutehandlers();
        return new RouterStateSnapshot(historySnapshot, handlersSnapshot);
    }

}