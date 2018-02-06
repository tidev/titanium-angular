import { TitaniumPlatformRef } from '../../TitaniumPlatformRef';
import { 
    SlideLeftTransition,
    TransitionRegistry,
    TransitionType
} from '../../../animation';

export function initializeCommonNavigationTransitions(platform: TitaniumPlatformRef) {
    const transitionRegistry = platform.injector.get(TransitionRegistry);
    transitionRegistry.registerTransitionClass(TransitionType.SlideLeft, SlideLeftTransition);
}