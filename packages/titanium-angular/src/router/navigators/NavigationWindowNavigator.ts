import { ComponentRef } from '@angular/core';

import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { NavigationTransitionHandler, TransitionType } from '../../animation';

/**
 * Navigator implementation for Ti.UI.iOS.NavigationWindow
 * 
 * This navigator can only open Ti.UI.Window views. Opened views will be stored
 * in a stack and closed by the navigation window's closeWindow() method.
 */
export class NavigationWindowNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.iOS.NavigationWindow';

    static supportedViews: Set<string> = new Set(['Ti.UI.Window']);

    /**
     * Root window of this navigator which is a iOS NavigationWindow
     */
    private rootWindow: Titanium.UI.iOS.NavigationWindow = null;

    /**
     * Stack of windows that are openend in the NavigationWindow
     */
    private windows: Array<Titanium.Proxy> = [];

    /**
     * Handles transition animations during opening and closing windows.
     */
    private transitionHandler: NavigationTransitionHandler;

    /**
     * Constructs a new NavigationWindow navigator
     * 
     * @param titaniumView Titanium.UI.iOS.NavigationWindow that will be used as the root window.
     */
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