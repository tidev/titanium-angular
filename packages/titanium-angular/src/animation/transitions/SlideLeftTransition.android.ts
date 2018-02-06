import { NavigationTransition } from '../NavigationTransition';
import { AbstractTransition } from "./AbstractTransition";

export class SlideLeftTransition extends AbstractTransition {
    name: string = 'slideLeft';

    initializeAnimations(futureView: Titanium.UI.WindowProxy, currentView: Titanium.UI.WindowProxy, transition: NavigationTransition) {
        this.openWindowOptions.activityEnterAnimation = Titanium.Android.R.anim.slide_in_left;
    }

    startTransition() {

    }
}