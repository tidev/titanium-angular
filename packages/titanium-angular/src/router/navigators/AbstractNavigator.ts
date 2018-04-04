import { ComponentRef, EventEmitter, Injector } from '@angular/core';

import { ElementNode, TitaniumElement } from '../../vdom';
import { NavigationOptions } from '../NavigationOptions';

export interface NativeNavigationEvent {
    
}

/**
 * Abstract navigator
 */
export abstract class AbstractNavigator {

    static supportedRootView: string = null;

    public nativeNavigationState = new EventEmitter<NativeNavigationEvent>();

    /**
     * List of views this navigator can open.
     */
    protected supportedViews: Array<string> = [];

    /**
     * List of views after which this navigator needs to yield to another
     * navigator
     */
    protected yieldNavigationViews: Array<string> = [];


    protected _injector: Injector;

    set injector(injector: Injector) {
        this._injector = injector;
    }

    /**
     * Returns wether this navigator can handle the navigation using the
     * specified view as its root view.
     * 
     * @param view Root view on which this navigator should start navigation
     */
    static canHandle(view: Titanium.Proxy): boolean {
        return this.supportedRootView === view.apiName;
    }

    /**
     * Initializes this navigator.
     */
    abstract initialize(): void;

    /**
     * Opens the root view of this navigator.
     */
    abstract openRootWindow(): void;

    /**
     * Returns wether this navigator should yield his navigating responsibilities
     * of to another navigator.
     * 
     * @param view Last view that was opened
     */
    public shouldYieldNavigating(view: Titanium.Proxy): boolean {
        return this.yieldNavigationViews.indexOf(view.apiName) !== -1;
    }

    /**
     * Return wether this navigator is able to open the given view.
     * 
     * @param view Titanium view that should be opnened
     */
    public canOpen(view: Titanium.Proxy): boolean {
        return this.supportedViews.indexOf(view.apiName) !== -1;
    }

    /**
     * Opens the given view using the navigation options.
     * 
     * @param view View that should be opnened
     * @param options Navigation options to apply while opening the view
     */
    abstract open(view: Titanium.Proxy, options: NavigationOptions);

    /**
     * Navigates one view back in the currently active stack.
     */
    abstract back();

    public toString() {
        return this.constructor.name;
    }

}