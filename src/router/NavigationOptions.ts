import { NavigationTransition } from '../animation';

export interface NavigationOptions {
    clearHistory?: boolean;
    animated?: boolean;
    transition?: NavigationTransition;
}