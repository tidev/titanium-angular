import { Injectable } from '@angular/core';

import { DeviceEnvironment } from '../services';
import { NavigationTransition } from './NavigationTransition';
import { TransitionRegistry } from './transitions/TransitionRegistry';

/**
 * Handles applying transitions from one window to another during navigation.
 */
@Injectable()
export class NavigationTransitionHandler {

    constructor(private transitionRegistry: TransitionRegistry) {

    }

    /**
     * Prepares a transition to a view that will be used when the view is opened.
     * 
     * @param view 
     * @param transition 
     * @param openWindowOptions
     */
    prepareTransition(futureView: any, currentView: any, transition: NavigationTransition, openWindowOptions: Titanium.UI.OpenWindowOptions) {
        if (!this.transitionRegistry.hasTransition(transition.type)) {
            throw new Error(`Invalid transition specified, ${transition.type} is not a known transition name.`);
        }

        const transitionClass = this.transitionRegistry.getTransitionClass(transition.type);
        const transitionInstance = new transitionClass(openWindowOptions);
        transitionInstance.initializeAnimations(futureView, currentView, transition);
    }
}