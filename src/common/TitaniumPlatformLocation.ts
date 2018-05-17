import {
    LocationChangeListener,
    LocationStrategy,
    PlatformLocation
} from '@angular/common';
import { Injectable } from '@angular/core';

import { HistoryStack } from './HistoryStack';
import { NavigationManager } from '../router/NavigationManager';

/**
 * 
 */
@Injectable()
export class TitaniumPlatformLocation extends PlatformLocation {

    private _history: HistoryStack;

    private navigationManager: NavigationManager;

    constructor(history: HistoryStack, navigationManager: NavigationManager) {
        super();
        
        this._history = history;
        this.navigationManager = navigationManager;
    }

    getBaseHrefFromDOM(): string {
        return '';
    }

    onPopState(fn: LocationChangeListener): void {
        console.log('TitaniumPlatformLocation.onPopState');
        this._history.onPopState(fn);
    }

    onHashChange(fn: LocationChangeListener): void {
        console.log('TitaniumPlatformLocation.onHashChange - not implemented');
    }

    get pathname(): string {
        console.log('TitaniumPlatformLocation.pathname');
        const state = this._history.state;
        const path = state ? state.url : '/';
        console.log(`TitaniumPlatformLocation.path is ${path}`);
        return path;
    }

    get search(): string {
        return '';
    }

    get hash(): string {
        return '';
    }

    replaceState(state: any, title: string, url: string): void {
        console.log('TitaniumPlatformLocation.replaceState');
        this._history.replaceState(state, title, url, null);
    }

    pushState(state: any, title: string, url: string): void {
        console.log('TitaniumPlatformLocation.pushState');
        this._history.pushState(state, title, url, null);
    }

    forward(): void {
        console.log('TitaniumPlatformLocation.forward');
        throw new Error('Using forward() is not supported by the Titanium platform');
    }

    back(): void {
        console.log('TitaniumPlatformLocation.back');
        this.navigationManager.locationBackNavigation = true;
        this._history.back();
    }
}