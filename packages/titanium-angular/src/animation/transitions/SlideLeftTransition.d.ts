import { NavigationTransition } from '../NavigationTransition';
import { AbstractTransition } from "./AbstractTransition";

export declare class SlideLeftTransition extends AbstractTransition {
    name: string;
    initializeAnimations(futureView: Titanium.UI.View, currentView: Titanium.UI.View, transition: NavigationTransition);
    startTransition();
}