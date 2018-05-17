import { TitaniumPlatformRef } from '../../TitaniumPlatformRef';
import { TransitionRegistry, TransitionType } from '../../../animation';
import { initializeCommonNavigationTransitions } from './transitions-common';

export function initializeNavigationTransitions(platform: TitaniumPlatformRef) {
    initializeCommonNavigationTransitions(platform);
    
    const transitionRegistry = platform.injector.get(TransitionRegistry);
    
}