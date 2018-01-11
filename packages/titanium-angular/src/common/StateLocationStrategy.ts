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
        const path = state ? state.url : '/';
        console.log(`StateLocationStrategy.path is ${path}`);
        return path;
    }

    prepareExternalUrl(internal: string): string {
        console.log('StateLocationStrategy.prepareExternalUrl');
        return internal;
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`StateLocationStrategy.pushState(${state}, ${title}, ${url}, ${queryParams})`);
        this.states.push({
            state: state,
            title: title,
            url: url,
            queryString: queryParams
        });
    }

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        console.log(`StateLocationStrategy.replaceState(${state}, ${title}, ${url}, ${queryParams})`);

        if (this.states.length > 0) {
            console.log(`replacing existing state`);
            const topState = this.peekState();
            topState.state = state;
            topState.title = title;
            topState.url = url;
            topState.queryString = queryParams;
        } else {
            console.log('pushing new state');
            this.states.push({
                state: state,
                title: title,
                url: url,
                queryString: queryParams
            });
        }
    }

    forward(): void {
        console.log('StateLocationStrategy.forward');
        throw new Error('Using forward() is not supported by the Titanium platform');
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