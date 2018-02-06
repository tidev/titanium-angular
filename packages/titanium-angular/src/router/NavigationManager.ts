import { Location, LocationStrategy } from "@angular/common";
import { ComponentRef, Injectable, Injector, Type } from "@angular/core";

import { Logger } from '../log';
import { ElementNode, TitaniumElement, InvisibleElement } from '../vdom';
import { NavigationOptions } from "./NavigationOptions";
import { AbstractNavigator, NativeNavigationEvent } from "./navigators/AbstractNavigator";
import { TabGroupNavigator } from "./navigators/TabGroupNavigator";
import { WindowNavigator } from "./navigators/WindowNavigator";

@Injectable()
export class NavigationManager {

    public currentNavigationOptions: NavigationOptions;

    private location: Location;

    private injector: Injector;

    private logger: Logger;

    private availableNavigators: Array<any> = [
        TabGroupNavigator,
        WindowNavigator
    ]

    private openableViews: Array<string> = ['Ti.UI.Window', 'Ti.UI.TabGroup'];

    private navigators: Array<AbstractNavigator> = [];

    private activeNavigator: AbstractNavigator;

    private _nativeBackNavigation: boolean = false;

    constructor(location: Location, injector: Injector, logger: Logger) {
        this.location = location;
        this.injector = injector;
        this.logger = logger;

        this.logger.trace('NavigationManager.constructor');
        this.logger.debug(typeof this.injector);
    }

    get isNativeBackNavigation(): boolean {
        return this._nativeBackNavigation;
    }

    set nativeBackNavigation(nativeBackNavigation: boolean) {
        this._nativeBackNavigation = nativeBackNavigation;
    }

    initializeRootNavigator(component: ComponentRef<any>) {
        const navigator = this.createNavigator(component);
        navigator.openRootWindow();
        this.pushNavigator(navigator);
    }

    open(component: ComponentRef<any>) {
        const componentName = component.componentType.name;
        this.logger.trace(`NavigationManager.open(${componentName})`);

        if (!this.activeNavigator) {
            throw new Error(`No active navigator available to handle navigation to ${componentName}`);
        }
        
        const titaniumView = this.findTopLevelWindow(component);
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

        const titaniumView = this.findTopLevelWindow(component);
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

    private findTopLevelWindow(component: ComponentRef<any>): Titanium.UI.WindowProxy {
        const componentName = component.componentType.name;
        const componentElement: ElementNode = component.location.nativeElement;
        const candidateElement = componentElement.firstElementChild;
        if (!(candidateElement instanceof TitaniumElement) || !this.isWindow(candidateElement.titaniumView)) {
            throw new Error(`Could not find an openable Titanium view as the top-level element in component ${componentName}`);
        }

        return candidateElement.titaniumView;
    }

    /**
     * @param view 
     */
    private isWindow(view: Titanium.Proxy): view is Titanium.UI.WindowProxy {
        if (!view) {
            return false;
        }

        return this.openableViews.indexOf(view.apiName) !== -1;
    }

}