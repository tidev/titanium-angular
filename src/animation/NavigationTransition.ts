/**
 * Built-in transition types
 */
export enum TransitionType {
    None = 'none',
    SlideLeft = 'slideLeft'
}

/**
 * A navigation transition specifiies a transtion type and
 * an optional duration.
 * 
 * Duration defaults to 350ms if not set.
 */
export interface NavigationTransition {
    type: string | TransitionType;
    duration?: number;
}