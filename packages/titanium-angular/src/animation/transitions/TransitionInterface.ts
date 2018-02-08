import { NavigationTransition } from "../NavigationTransition";

export interface TransitionConstructor {
    new (openWindowOptions: Titanium.UI.OpenWindowOptions): TransitionInterface
}

export interface TransitionInterface {
    name: string;
    initializeAnimations(futureView: Titanium.UI.View, currentView: Titanium.UI.View, transition: NavigationTransition);
    startTransition();
}