import { Location, LocationStrategy } from "@angular/common";
import { ComponentRef, Injectable, Injector, Type } from "@angular/core";
import { Subscription } from "rxjs";

import { Logger } from '../log';
import { ElementNode, TitaniumElement, InvisibleElement } from '../vdom';
import { NavigationOptions } from "./NavigationOptions";
import { AbstractNavigator, NativeNavigationEvent } from "./navigators/AbstractNavigator";
import { NavigationWindowNavigator } from './navigators/NavigationWindowNavigator';
import { TabGroupNavigator } from "./navigators/TabGroupNavigator";
import { WindowNavigator } from "./navigators/WindowNavigator";

type OpenableView = Titanium.UI.TabGroup | Titanium.UI.Window | Titanium.UI.iOS.NavigationWindow;

/**
 * Manages navigation inside the app by using different navigators which
 * handle opening and closing views inside the view hierarchy.
 */
@Injectable()
export class NavigationManager {

    /**
     * Navigation options for the current route.
     */
    public currentNavigationOptions: NavigationOptions;

    /**
     * Angular root injector
     */
    private injector: Injector;

    /**
     * The default logger instance.
     */
    private logger: Logger;

    /**
     * List of available navigators.
     */
    private availableNavigators: Array<any> = [
        NavigationWindowNavigator,
        TabGroupNavigator,
        WindowNavigator
    ];

    private _openableViews: Set<string>;

    /**
     * Stack of navigators.
     */
    private navigators: Array<AbstractNavigator> = [];

    /**
     * Reference to the currently active navigator.
     */
    private activeNavigator: AbstractNavigator;

    /**
     * Subscriptions to the native naviation state event emitter of the
     * currently active navigator. Used to unsubscribe from events for 
     * that navigator just before a new one is activated.
     */
    private activeNativeNavigationStateSubscription: Subscription;

    /**
     * Internal Flag indicating that a native back navigation is in progress.
     */
    private _nativeBackNavigation: boolean = false;

    /**
     * Internal flag indicating that a back navigation triggered by
     * {@link TitaniumPlatformLocation} is in progress.
     */
    private _locationBackNavigation: boolean = false;

    /**
     * Constructs the navigation manager.
     * 
     * @param injector Global Angular root injector
     * @param logger Default logger instance
     */
    constructor(injector: Injector, logger: Logger) {
        this.injector = injector;
        this.logger = logger;
    }

    /**
     * A set of views that can automatically be openend using one of the available
     * navigators.
     * 
     * Generated automatically on first access from the list of available
     * navigators using their supportedViews property.
     */
    private get openableViews(): Set<string> {
        if (!this._openableViews) {
            console.log('init openableViews');
            this._openableViews = new Set();
            this.availableNavigators.forEach((navigator: typeof AbstractNavigator) => {
                console.log(`${navigator.name}.supportedViews: ${Array.from(navigator.supportedViews).join(', ')}`);
                navigator.supportedViews.forEach(viewApiName => this._openableViews.add(viewApiName));
            });
            console.log(this._openableViews);
        }

        return this._openableViews;
    }

    /**
     * Returns true if a native back navigation is currently in progress.
     */
    get isNativeBackNavigation(): boolean {
        return this._nativeBackNavigation;
    }

    /**
     * Sets the flag indicating a native back navigation.
     */
    set nativeBackNavigation(nativeBackNavigation: boolean) {
        this._nativeBackNavigation = nativeBackNavigation;
    }

    /**
     * Returns true if a back navigation triggered by {@link TitaniumPlatformLocation}
     * is currently in progress.
     */
    get isLocationBackNavigation(): boolean {
        return this._locationBackNavigation;
    }

    /**
     * Sets the flag indicating a location triggered back navigation.
     */
    set locationBackNavigation(locationBackNavigation: boolean) {
        this._locationBackNavigation = locationBackNavigation;
    }

    /**
     * Creates the root navigator and opens its root window.
     * 
     * @param component 
     */
    createAndOpenRootNavigator(component: ComponentRef<any>) {
        const navigator = this.createNavigator(component);
        navigator.openRootWindow();
        this.pushNavigator(navigator);
    }

    /**
     * Opens 
     * 
     * @param component 
     */
    open(component: ComponentRef<any>) {
        const componentName = component.componentType.name;

        if (!this.activeNavigator) {
            throw new Error(`No active navigator available to handle navigation to ${componentName}`);
        }
        
        const titaniumView = this.findTopLevelOpenableView(component);
        if (!this.activeNavigator.canOpen(titaniumView)) {
            throw new Error(`Currently active navigator ${this.activeNavigator} cannot open a ${titaniumView.apiName}`);
        }

        this.logger.debug(`NavigationManager - ${this.activeNavigator}.open(${titaniumView.apiName}) from component: ${componentName}`);
        this.activeNavigator.open(titaniumView, this.currentNavigationOptions);

        if (this.activeNavigator.shouldYieldNavigating(titaniumView)) {
            this.logger.trace(`NavigationManager - ${this.activeNavigator} cannot continue after ${titaniumView.apiName} was opened, yielding to new navigator.`);
            const navigator = this.createNavigator(component);
            this.pushNavigator(navigator);
        }

        // @todo Handle modals -> create new appropriate navigator
    }

    back() {
        this.logger.trace('NavigationManager.back()');

        if (!this.activeNavigator) {
            throw new Error('No active navigator available to handle back navigation request.');
        }

        if (this.activeNavigator.canGoBack()) {
            this.logger.trace(`NavigationManager - ${this.activeNavigator} has windows it can close, going back.`);
            this.activeNavigator.back();
        } else {
            if (this.navigators.length === 1) {
                throw new Error('Tried to close the root navigator, which is not allowed.');
            }
            this.logger.trace(`NavigationManager - ${this.activeNavigator} has no more windows it can close, closing and popping navigator.`);
            this.activeNavigator.closeRootWindow();
            this.popNavigator();
        }
    }

    /**
     * Creates a new navigator instance for the given component.
     * 
     * Removes the component from the DOM tree and searches for the first
     * openable view element. Then it tries to find the appropriate 
     * navigator for this view and creates it.
     * 
     * @param component 
     */
    private createNavigator(component: ComponentRef<any>): AbstractNavigator {
        const componentName = component.componentType.name;
        const componentElement: ElementNode = component.location.nativeElement;
        componentElement.parentElement.removeChild(componentElement);

        const titaniumView = this.findTopLevelOpenableView(component);
        let navigator: AbstractNavigator = null;
        for (const candidateNavigatorClass of this.availableNavigators) {
            if ((<typeof AbstractNavigator>candidateNavigatorClass).canHandle(titaniumView)) {
                this.logger.debug(`Creating navigator ${candidateNavigatorClass.name} for component ${componentName}.`);
                navigator = new candidateNavigatorClass(titaniumView);
                navigator.injector = this.injector;
                navigator.initialize();
                break;
            }
        }

        if (navigator === null) {
            throw new Error(`Could not resolve matching navigator for component ${componentName} (top-level view: ${titaniumView.apiName}).`);
        }

        return navigator;
    }

    /**
     * Activates the passed navigator, subscribing to native navigation state events.
     * 
     * @param navigator Navigator to activate
     */
    private activateNavigator(navigator: AbstractNavigator): void {
        this.activeNavigator = navigator;
        this.activeNativeNavigationStateSubscription = this.activeNavigator.nativeNavigationState.subscribe(nativeNavigationEvent => {
            if (this.isNativeBackNavigation) {
                throw new Error('Native back navigation is already in progress');
            }

            this._nativeBackNavigation = true;
        });

        this.logger.trace(`NavigationManager - new active navigator: ${this.activeNavigator}`);
    }

    /**
     * Pushes a new navigator on the stack and activates it.
     * 
     * @param navigator Navigator to push on the stack
     */
    private pushNavigator(navigator: AbstractNavigator) {
        this.logger.trace('NavigationManager.pushNavigator');

        if (this.activeNavigator) {
            this.activeNativeNavigationStateSubscription.unsubscribe();
        }

        this.navigators.push(navigator);
        this.activateNavigator(navigator);
    }

    private popNavigator(): AbstractNavigator {
        this.logger.trace('NavigationManager.popNavigator');

        if (this.navigators.length == 1) {
            throw new Error(`The last navigator in the stack connot be closed.`);
        }

        const poppedNavigator = this.navigators.pop();
        this.activeNativeNavigationStateSubscription.unsubscribe();

        this.activateNavigator(this.navigators[this.navigators.length - 1]);

        return poppedNavigator;
    }

    private findTopLevelOpenableView(component: ComponentRef<any>): OpenableView {
        const componentName = component.componentType.name;
        const componentElement: ElementNode = component.location.nativeElement;
        const candidateElement = componentElement.firstElementChild;
        if (!(candidateElement instanceof TitaniumElement) || !this.isOpenableView(candidateElement.titaniumView)) {
            throw new Error(`Could not find an openable Titanium view as the top-level element in component ${componentName}`);
        }

        return candidateElement.titaniumView;
    }

    /**
     * @param view 
     */
    private isOpenableView(view: Titanium.Proxy): view is OpenableView {
        if (!view) {
            return false;
        }

        return this.openableViews.has(view.apiName);
    }

}