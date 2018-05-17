import { LocationChangeListener, LocationChangeEvent } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LocationState {
    state: any;
    title: string,
    url: string,
    queryString: string
}

/**
 * A stack based history of location states, mimicking the HTML5 History API.
 */
@Injectable()
export class HistoryStack {

    /**
     * List of location states.
     */
    private states: Array<LocationState> = [];

    /**
     * Used to announce state changes to subscribers.
     */
    private statesSubject = new Subject<LocationChangeEvent>();

    /**
     * Gets the most recent state from the top of the stack.
     */
    get state(): LocationState {
        if (this.states.length === 0) {
            return null;
        }

        return this.states[this.states.length - 1];
    }

    /**
     * Gets the number of entries currently stored in the history.
     */
    get length(): number {
        return this.states.length;
    }

    /**
     * Pops the most recent history entry from the top of the stack and issues an
     * 'onpopstate' event.
     */
    back() {
        const poppedState = this.popState();
        this.statesSubject.next({ type: 'onpopstate', state: poppedState });
    }

    /**
     * Pushes a new hitory entry to the top of the stack.
     * 
     * @param state Custom state data associate with the history entry
     * @param title A short title for the new state
     * @param url The new history entry's URL
     * @param queryParams Any query parameters of the history entry
     */
    pushState(state: any, title: string, url: string, queryParams: string): void {
        this.states.push({
            state: state,
            title: title,
            url: url,
            queryString: queryParams
        });
    }

    /**
     * Replaces the topmost history entry with a new one.
     * 
     * @param state Custom state data associate with the history entry
     * @param title A short title for the new state
     * @param url The new history entry's URL
     * @param queryParams Any query parameters of the history entry
     */
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
     * Removes the topmost history entry from the stack.
     * 
     * Note that this does not notify any onpopstate listeners. This is for
     * internal modification of the history stack. For backwards navigation use
     * the back() method.
     */
    popState() {
        return this.states.pop();
    }

    /**
     * Registers a new handler function for the 'popstate' event
     * 
     * @param fn Handler function
     */
    onPopState(fn: LocationChangeListener): void {
        this.statesSubject.subscribe((locationChangeEvent) => {
            fn(locationChangeEvent);
        });
    }

    /**
     * Returns a copy of the current history stack.
     */
    snapshotStack(): Array<LocationState> {
        return [...this.states];
    }

    /**
     * Replaces all history entries with the given entries.
     * 
     * @param states List of history entries
     */
    restoreStack(states: Array<LocationState>): void {
        this.states = states;
    }

}