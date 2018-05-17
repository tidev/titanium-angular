import { Injectable } from '@angular/core';

import { DeviceEnvironment } from '../../services';
import { AbstractTransition } from './AbstractTransition';
import { TransitionConstructor } from './TransitionInterface';
import { SlideLeftTransition } from './SlideLeftTransition.ios';

@Injectable()
export class TransitionRegistry {
    private transitions: Map<string, TransitionConstructor> = new Map();

    registerTransitionClass(name: string, transitionClass: TransitionConstructor) {
        console.log(`Register transition ${name}`);
        this.transitions.set(name, transitionClass);
    }

    hasTransition(name: string) {
        return this.transitions.has(name);
    }

    getTransitionClass(name: string): TransitionConstructor {
        return this.transitions.get(name);
    }
}