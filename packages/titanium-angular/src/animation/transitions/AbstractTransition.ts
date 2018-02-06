import { NavigationTransition } from '../NavigationTransition'
import { TransitionInterface } from "./TransitionInterface";

export abstract class AbstractTransition implements TransitionInterface {
    abstract name;

    defaultDuration: number = 350;

    constructor(protected openWindowOptions: Titanium.UI.OpenWindowOptions) {

    }

    abstract initializeAnimations(futureView: Titanium.UI.WindowProxy, currentView: Titanium.UI.WindowProxy, transition: NavigationTransition);
    abstract startTransition();
}