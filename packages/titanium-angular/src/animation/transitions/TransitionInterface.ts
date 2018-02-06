import { NavigationTransition } from "../NavigationTransition";

export interface TransitionConstructor {
    new (openWindowOptions: Titanium.UI.OpenWindowOptions): TransitionInterface
}

export interface TransitionInterface {
    name: string;
    initializeAnimations(futureView: Titanium.UI.WindowProxy, currentView: Titanium.UI.WindowProxy, transition: NavigationTransition);
    startTransition();
}