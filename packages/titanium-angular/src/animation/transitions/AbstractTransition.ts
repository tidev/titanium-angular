import { NavigationTransition } from '../NavigationTransition'
import { TransitionInterface } from "./TransitionInterface";

export abstract class AbstractTransition implements TransitionInterface {
    abstract name;

    defaultDuration: number = 350;

    constructor(protected openWindowOptions: Titanium.UI.OpenWindowOptions) {

    }

    abstract initializeAnimations(futureView: Titanium.UI.View, currentView: Titanium.UI.View, transition: NavigationTransition);
    abstract startTransition();
}