import {
    LocationChangeListener,
    LocationStrategy
} from '@angular/common';

export interface LocationState {
    state: any;
    title: string,
    url: string,
    queryString: string
}

/**
 * A locatation strategy mimicing HTML5 history by storing location
 * states in a stack.
 */
export class StateLocationStrategy extends LocationStrategy {
    private states = new Array<LocationState>();

    path(includeHash?: boolean): string {
        const state = this.peekState();
        return state ? state.url : '/';
    }

    prepareExternalUrl(internal: string): string {
        console.log('StateLocationStrategy.prepareExternalUrl');
        return internal;
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        console.log('StateLocationStrategy.pushState');
        this.states.push({
            state: state,
            title: title,
            url: url,
            queryString: queryParams
        })
    }

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        console.log('StateLocationStrategy.replaceState');
    }

    forward(): void {

    }

    back(): void {
        console.log('StateLocationStrategy.back');
    }

    onPopState(fn: LocationChangeListener): void {
        console.log('StateLocationStrategy.onPopState');
    }

    getBaseHref(): string {
        return '';
    }

    /**
     * Returns the top location state withput popping it from the stack
     */
    private peekState(): LocationState {
        if (this.states.length === 0) {
            return null;
        }

        return this.states[this.states.length - 1];
    }

}