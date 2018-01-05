import {
    LocationChangeListener,
    LocationStrategy,
    PlatformLocation
} from '@angular/common';

import { Injectable } from '@angular/core';

/**
 * 
 */
@Injectable()
export class TitaniumPlatformLocation extends PlatformLocation {

    private _locationStrategy: LocationStrategy;

    constructor(locationStrategy: LocationStrategy) {
        super();
        
        this._locationStrategy = locationStrategy;
    }

    getBaseHrefFromDOM(): string {
        return '';
    }

    onPopState(fn: LocationChangeListener): void {
        console.log('TitaniumPlatformLocation.onPopState');
        this._locationStrategy.onPopState(fn);
    }

    onHashChange(fn: LocationChangeListener): void {
        console.log('TitaniumPlatformLocation.onHashChange');
    }

    get pathname(): string {
        console.log('TitaniumPlatformLocation.pathname');
        return this._locationStrategy.path();
    }

    get search(): string {
        return '';
    }

    get hash(): string {
        return '';
    }

    replaceState(state: any, title: string, url: string): void {
        console.log('TitaniumPlatformLocation.replaceState');
        this._locationStrategy.replaceState(state, title, url, null);
    }

    pushState(state: any, title: string, url: string): void {
        console.log('TitaniumPlatformLocation.pushState');
        this._locationStrategy.pushState(state, title, url, null);
    }

    forward(): void {
        console.log('TitaniumPlatformLocation.forward');
        throw new Error('Using forward() is not supported by the Titanium platform');
    }

    back(): void {
        console.log('TitaniumPlatformLocation.back');
        this._locationStrategy.back();
    }
}