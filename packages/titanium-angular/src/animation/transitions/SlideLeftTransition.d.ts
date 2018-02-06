import { NavigationTransition } from '../NavigationTransition';
import { AbstractTransition } from "./AbstractTransition";

export declare class SlideLeftTransition extends AbstractTransition {
    name: string;
    initializeAnimations(futureView: Titanium.UI.WindowProxy, currentView: Titanium.UI.WindowProxy, transition: NavigationTransition);
    startTransition();
}