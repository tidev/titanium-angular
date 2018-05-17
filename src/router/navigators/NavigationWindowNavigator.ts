import { PlatformLocation } from '@angular/common';
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
     * Titanium specific implementation of PlatformLocation
     */
    private location: PlatformLocation;

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
        this.location = this._injector.get(PlatformLocation);
    }

    openRootWindow(): void {
        this.rootWindow.open();
    }

    closeRootWindow(): void {
        this.rootWindow.close();
    }

    open(view: Titanium.Proxy, options: NavigationOptions) {
        view.addEventListener('close', this.onWindowClose.bind(this));
        this.windows.push(view);
        this.rootWindow.openWindow(<Titanium.UI.Window>view, { animated: true });
    }

    canGoBack() {
        return this.windows.length >= 1;
    }

    back() {
        const window = <Titanium.UI.Window>this.windows.pop();
        window.removeEventListener('close', this.onWindowClose);
        this.rootWindow.closeWindow(window, null);
    }

    /**
     * Event handler for the "close" event of windows that were opened in the
     * root navigation window.
     * 
     * Used to update Angular routing when a native back navigation was
     * triggered.
     * 
     * @param event 
     */
    onWindowClose(event: any): void {
        const window = <Titanium.UI.Window>event.source;
        window.removeEventListener('close', this.onWindowClose);

        this.nativeNavigationState.emit();
        this.location.back();
    }

}