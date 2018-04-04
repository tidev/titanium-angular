import { PlatformLocation } from '@angular/common';
import { ComponentRef } from '@angular/core';

import { TitaniumPlatformLocation } from '../../common';
import { DeviceEnvironment } from '../../services';
import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { ApplicationRef } from '@angular/core';

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

        this.tabGroup.addEventListener('focus', (event) => {
            console.log(`TabGroupNavigator - selected tab changed from ${event.previousIndex} to ${event.index}`);
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
    }

    onWindowClose(event: any): void {
        console.log('TabGroupNavigator.onWindowClose');
        const window = <Titanium.UI.Window>event.source;
        window.removeEventListener('close', this.onWindowClose);
        this.nativeNavigationState.emit();
        this.location.back();
        console.log('after location.back()');
    }

}