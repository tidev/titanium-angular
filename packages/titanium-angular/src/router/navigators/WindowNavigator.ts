import { ComponentRef } from '@angular/core';

import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator } from "./AbstractNavigator";
import { NavigationTransitionHandler, TransitionType } from '../../animation';

/**
 * Navigator implementation for Ti.UI.Window.
 * 
 * This navigator can open other windows, tab groups and iOS navigation windows.
 * Opened views will be stored in a stack to support back navigation.
 */
export class WindowNavigator extends AbstractNavigator {

    static supportedRootView: string = 'Ti.UI.Window';

    static supportedViews: Set<string> = new Set(['Ti.UI.Window', 'Ti.UI.TabGroup', 'Ti.UI.iOS.NavigationWindow']);

    protected yieldNavigationViews: Set<string> = new Set(['Ti.UI.TabGroup', 'Ti.UI.iOS.NavigationWindow']);

    /**
     * The Ti.UI.Window that acts as the root window.
     */
    private rootWindow: Titanium.UI.Window = null;

    /**
     * Stack of views that were opened by this navigator.
     */
    private windows: Array<Titanium.Proxy> = [];

    /**
     * Handles transition animations during opening and closing windows.
     */
    private transitionHandler: NavigationTransitionHandler;

    /**
     * Constructs a new window navigator.
     * 
     * @param titaniumView Titanium.UI.Window that will be used as the root window.
     */
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

        if (this.isWindow(view) || this.isNavigationWindow(view)) {
            view.open(openWindowOptions);
        } else if (this.isTabGroup(view)) {
            view.open();
        }
    }

    back() {

    }

    /**
     * Custom type guard to check if a view is a Ti.UI.Window.
     * 
     * @param view View to check
     */
    private isWindow(view: Titanium.Proxy): view is Titanium.UI.Window {
        return view.apiName === 'Ti.UI.Window'
    }

    /**
     * Custom type guard to check if a view is a Ti.UI.TabGroup.
     * 
     * @param view View to check
     */
    private isTabGroup(view: Titanium.Proxy): view is Titanium.UI.TabGroup {
        return view.apiName === 'Ti.UI.TabGroup';
    }

    /**
     * Custom type guard to check if a view is a Ti.UI.iOS.NavigationWindow.
     * 
     * @param view View to check
     */
    private isNavigationWindow(view: Titanium.Proxy): view is Titanium.UI.iOS.NavigationWindow {
        return view.apiName === 'Ti.UI.iOS.NavigationWindow';
    }

}