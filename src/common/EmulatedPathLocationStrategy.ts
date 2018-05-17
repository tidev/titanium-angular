import {
    LocationChangeListener,
    LocationStrategy,
    PlatformLocation
} from '@angular/common';
import { Injectable } from '@angular/core';

import { HistoryStack } from './HistoryStack';

/**
 * A path location strategy that copies most of it's behavior from Angular's
 * PathLocationStrategy but doesn't require a base url since we don't have
 * that in our JS context.
 */
@Injectable()
export class EmulatedPathLocationStrategy extends LocationStrategy {

    constructor(private _platformLocation: PlatformLocation) {
        super();
    }

    path(includeHash?: boolean): string {
        console.log('EmulatedPathLocationStrategy.path');
        return this._platformLocation.pathname;
    }

    prepareExternalUrl(internal: string): string {
        console.log('EmulatedPathLocationStrategy.prepareExternalUrl');
        return internal;
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`EmulatedPathLocationStrategy.pushState(${state}, ${title}, ${url}, ${queryParams})`);
        this._platformLocation.pushState(state, title, url);
    }

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`EmulatedPathLocationStrategy.replaceState(${state}, ${title}, ${url}, ${queryParams})`);
        this._platformLocation.replaceState(state, title, url);
    }

    forward(): void {
        console.log('EmulatedPathLocationStrategy.forward');
        throw new Error('Using forward() is not supported by the Titanium platform');
    }

    back(): void {
        console.log('EmulatedPathLocationStrategy.back');
        this._platformLocation.back();
    }

    onPopState(fn: LocationChangeListener): void {
        console.log('EmulatedPathLocationStrategy.onPopState');
        this._platformLocation.onPopState(fn);
    }

    getBaseHref(): string {
        return '';
    }

}