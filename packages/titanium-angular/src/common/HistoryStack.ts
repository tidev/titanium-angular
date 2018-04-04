import { LocationChangeListener, LocationChangeEvent } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LocationState {
    state: any;
    title: string,
    url: string,
    queryString: string
}

@Injectable()
export class HistoryStack {

    private states: Array<LocationState> = [];

    private statesSubject = new Subject<LocationChangeEvent>();

    get state() {
        if (this.states.length === 0) {
            return null;
        }

        return this.states[this.states.length - 1];
    }

    get length() {
        return this.states.length;
    }

    back() {
        const poppedState = this.popState();
        this.statesSubject.next({ type: 'onpopstate' });
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        this.states.push({
            state: state,
            title: title,
            url: url,
            queryString: queryParams
        });
    }

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        if (this.states.length > 0) {
            console.log(`replacing existing state`);
            this.state.state = state;
            this.state.title = title;
            this.state.url = url;
            this.state.queryString = queryParams;
        } else {
            console.log('pushing new state');
            this.pushState(state, title, url, queryParams);
        }
    }

    /**
     * Removes the top state from the stack.
     * 
     * Note that this does not notify any onpopstate listeners. This is for
     * internal modification of the history stack. For backwards navigation use
     * the back() method.
     */
    popState() {
        return this.states.pop();
    }

    onPopState(fn: LocationChangeListener): void {
        this.statesSubject.subscribe((locationChangeEvent) => {
            fn(locationChangeEvent);
        });
    }

    snapshotStack(): Array<LocationState> {
        return [...this.states];
    }

    restoreStack(states: Array<LocationState>): void {
        this.states = states;
    }

}