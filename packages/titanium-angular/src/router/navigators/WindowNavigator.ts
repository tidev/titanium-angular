import { ComponentRef } from '@angular/core';

import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator, OpenableView } from "./AbstractNavigator";

export class WindowNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.Window';

    protected supportedViews: Array<string> = ['Ti.UI.Window', 'Ti.UI.TabGroup'];

    protected yieldNavigationViews: Array<string> = ['Ti.UI.TabGroup'];

    private rootWindow: Titanium.UI.Window = null;

    private windows: Array<Titanium.UI.Window> = [];

    constructor(titaniumView: Titanium.UI.Window) {
        super();

        if (titaniumView.apiName !== 'Ti.UI.Window') {
            throw new Error('The WindowNavigator can only handle a Titanium view of type Window.');
        }

        this.rootWindow = titaniumView;
    }

    initialize(): void {
        
    }

    openRootWindow() {
        this.windows.push(this.rootWindow);
        this.rootWindow.open();
    }

    open(view: OpenableView, options: NavigationOptions) {
        // todo: close previous window?
        view.open();
    }

    back() {

    }

}