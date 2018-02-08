import { ComponentRef } from '@angular/core';

import { NavigationOptions } from '../NavigationOptions';
import { AbstractNavigator, OpenableView } from "./AbstractNavigator";
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

    open(view: OpenableView, options: NavigationOptions) {
        let openWindowOptions: Titanium.UI.OpenWindowOptions = {};

        if (options.clearHistory) {

        }

        console.log(`options: ${JSON.stringify(options)}`);
        console.log(`openWindowOptions: ${JSON.stringify(openWindowOptions)}`);

        if (options.transition.type !== TransitionType.None) {
            const currentView = this.windows[this.windows.length - 1];
            this.transitionHandler.prepareTransition(view, currentView, options.transition, openWindowOptions);
            console.log(`openWindowOptions: ${JSON.stringify(openWindowOptions)}`);
        }

        if (view instanceof Titanium.UI.Window) {
            view.open(openWindowOptions);
        } else if (view instanceof Titanium.UI.TabGroup) {
            view.open();
        }
    }

    back() {

    }

}