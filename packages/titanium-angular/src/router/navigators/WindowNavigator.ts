import { ComponentRef } from '@angular/core';

import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { NavigationTransitionHandler, TransitionType } from '../../animation';

export class WindowNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.Window';

    protected supportedViews: Array<string> = ['Ti.UI.Window', 'Ti.UI.TabGroup'];

    protected yieldNavigationViews: Array<string> = ['Ti.UI.TabGroup'];

    private rootWindow: Titanium.UI.Window = null;

    private windows: Array<Titanium.UI.Window> = [];

    private transitionHandler: NavigationTransitionHandler;

    constructor(titaniumView: Titanium.UI.Window) {
        super();

        if (titaniumView.apiName !== 'Ti.UI.Window') {
            throw new Error('The WindowNavigator can only handle navigation for Ti.UI.Window.');
        }

        this.rootWindow = titaniumView;
    }

    initialize(): void {
        this.transitionHandler = this._injector.get(NavigationTransitionHandler);
    }

    openRootWindow() {
        this.windows.push(this.rootWindow);
        this.rootWindow.open();
    }

    open(view: Titanium.UI.View, options: NavigationOptions) {
        let openWindowOptions: openWindowParams = {};

        if (options.clearHistory) {

        }

        console.log(`options: ${JSON.stringify(options)}`);
        console.log(`openWindowOptions: ${JSON.stringify(openWindowOptions)}`);

        if (options.transition.type !== TransitionType.None) {
            const currentView = this.windows[this.windows.length - 1];
            this.transitionHandler.prepareTransition(view, currentView, options.transition, openWindowOptions);
            console.log(`openWindowOptions: ${JSON.stringify(openWindowOptions)}`);
        }

        if (this.isWindow(view)) {
            view.open(openWindowOptions);
        } else if (this.isTabGroup(view)) {
            view.open();
        }
    }

    back() {

    }

    private isWindow(view: Titanium.UI.View): view is Titanium.UI.Window {
        return view.apiName === 'Ti.UI.Window'
    }

    private isTabGroup(view: Titanium.UI.View): view is Titanium.UI.TabGroup {
        return view.apiName === 'Ti.UI.TabGroup';
    }

}