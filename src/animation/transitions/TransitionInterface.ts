import { NavigationTransition } from "../NavigationTransition";

export interface TransitionConstructor {
    new (openWindowOptions: openWindowParams): TransitionInterface
}

export interface TransitionInterface {
    name: string;
    initializeAnimations(futureView: Titanium.UI.View, currentView: Titanium.UI.View, transition: NavigationTransition);
    startTransition();
}