import { NavigationTransition } from '../NavigationTransition';
import { AbstractTransition } from './AbstractTransition';

export class SlideLeftTransition extends AbstractTransition {
    name: string = 'slideLeft';

    initializeAnimations(futureView: Titanium.UI.View, currentView: Titanium.UI.View, transition: NavigationTransition) {
        futureView.transform = Titanium.UI.create2DMatrix().translate(Titanium.Platform.displayCaps.platformWidth, 0);
        const animation = Ti.UI.createAnimation({
            transform: Ti.UI.create2DMatrix().translate(0, 0),
            duration: transition.duration ? transition.duration : this.defaultDuration,
        });
        const startAnimation = () => {
            futureView.removeEventListener('open', startAnimation);
            futureView.animate(animation);
        };
        futureView.addEventListener('open', startAnimation);
    }

    startTransition() {

    }
}