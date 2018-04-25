import { Location, LocationStrategy } from "@angular/common";
import { ComponentRef, Injectable, Injector, Type } from "@angular/core";

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

    private _nativeBackNavigation: boolean = false;

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

    initializeRootNavigator(component: ComponentRef<any>) {
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

        this.activeNavigator.back();
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

    private pushNavigator(navigator: AbstractNavigator) {
        this.logger.trace('NavigationManager.pushNavigator');

        if (this.activeNavigator) {
            this.activeNavigator.nativeNavigationState.unsubscribe();
        }

        this.navigators.push(navigator);
        this.activeNavigator = navigator;

        this.activeNavigator.nativeNavigationState.subscribe(nativeNaviationEvent => {
            if (this.isNativeBackNavigation) {
                throw new Error('Native back navigation is already in progress');
            }
            
            this._nativeBackNavigation = true;
        });

        this.logger.trace(`NavigationManager - new active navigator: ${this.activeNavigator}`);
    }

    private popNavigator(navigator: AbstractNavigator) {
        this.logger.trace('NavigationManager.popNavigator');

        if (navigator !== this.activeNavigator) {
            throw new Error('Only the currently active navigator can be popped from the stack.');
        }

        this.navigators.pop();
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