import {
    LocationChangeListener,
    LocationStrategy,
    PlatformLocation
} from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationManager } from 'titanium-navigator';

import { HistoryStack } from './HistoryStack';

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
        this._history.onPopState(fn);
    }

    onHashChange(fn: LocationChangeListener): void {
        console.log('TitaniumPlatformLocation.onHashChange - not implemented');
    }

    get protocol(): string {
        return 'http';
    }

    get hostname(): string {
        return 'localhost'
    }

    get href(): string {
        return '';
    }

    get port(): string {
        return '80';
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

    getState() {
        return this._history.state;
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
        throw new Error('Using forward() is not supported by the Titanium platform');
    }

    back(): void {
        this.navigationManager.locationBackNavigation = true;
        this._history.back();
    }
}