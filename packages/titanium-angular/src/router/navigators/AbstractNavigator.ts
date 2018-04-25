import { ComponentRef, EventEmitter, Injector } from '@angular/core';

import { ElementNode, TitaniumElement } from '../../vdom';
import { NavigationOptions } from '../NavigationOptions';

export interface NativeNavigationEvent {
    
}

/**
 * Abstract navigator serving as a base class for the individual navigator
 * implementations.
 * 
 * A navigator operates on a root view (defined by the supportedRootView
 * property) and can open a set of other views (defined by supportedViews)
 * on top of that root view. It has to keep track of those views so they can be
 * closed later when a back navigation is requested.
 * 
 * If a navigator opens a view that requires another navigator to take over
 * (defined by yieldNavigationViews), the {@link NavigationManager} will
 * stop using the currently active navigator and search for a new one to
 * continue.
 */
export abstract class AbstractNavigator {

    /**
     * The root view this navigator operates on.
     */
    static supportedRootView: string = null;

    /**
     * Set of views that can be opned from this navigator.
     */
    static supportedViews: Set<string> = new Set();

    /**
     * Event emitter for native navigation state changes.
     */
    public nativeNavigationState = new EventEmitter<NativeNavigationEvent>();

    /**
     * Set of views after which this navigator needs to yield to another
     * navigator.
     */
    protected yieldNavigationViews: Set<string> = new Set();

    /**
     * Angular root injector.
     */
    protected _injector: Injector;

    /**
     * Sets the Angular root injector.
     */
    set injector(injector: Injector) {
        this._injector = injector;
    }

    /**
     * Returns wether this navigator can handle navigation using the
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
        return this.yieldNavigationViews.has(view.apiName);
    }

    /**
     * Return wether this navigator is able to open the given view.
     * 
     * @param view Titanium view that should be opnened
     */
    public canOpen(view: Titanium.Proxy): boolean {
        return (<any>this.constructor).supportedViews.has(view.apiName);
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