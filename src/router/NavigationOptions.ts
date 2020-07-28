import { NavigationTransition } from 'titanium-navigator';

export interface NavigationOptions {
    clearHistory?: boolean;
    animated?: boolean;
    transition?: NavigationTransition;
}