import { ComponentRef } from '@angular/core';

import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { NavigationTransitionHandler, TransitionType } from '../../animation';

export class NavigationWindowNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.iOS.NavigationWindow';

    static supportedViews: Set<string> = new Set(['Ti.UI.Window']);

    protected yieldNavigationViews: Set<string> = new Set();

    private rootWindow: Titanium.UI.iOS.NavigationWindow = null;

    private windows: Array<Titanium.Proxy> = [];

    private transitionHandler: NavigationTransitionHandler;

    constructor(titaniumView: Titanium.UI.iOS.NavigationWindow) {
        super();

        if (titaniumView.apiName !== 'Ti.UI.iOS.NavigationWindow') {
            throw new Error('The NavigationWindowNavigator can only handle navigation for Ti.UI.iOS.NavigationWindow.');
        }

        this.rootWindow = titaniumView;
    }

    initialize(): void {
        this.transitionHandler = this._injector.get(NavigationTransitionHandler);
    }

    openRootWindow(): void {
        this.rootWindow.open();
    }

    closeRootWindow(): void {
        this.rootWindow.close();
    }

    open(view: Titanium.Proxy, options: NavigationOptions) {
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

        this.windows.push(view);

        this.rootWindow.openWindow(<Titanium.UI.Window>view, openWindowOptions);
    }

    canGoBack() {
        return this.windows.length > 1;
    }

    back() {
        this.rootWindow.closeWindow(<Titanium.UI.Window>this.windows.pop(), null);
    }

}