export enum TransitionType {
    CurlDown = 'curlDown',
    CurlUp = 'curlUp',
    Fade = 'fade',
    FlipRight = 'flipRight',
    FlipLeft = 'flipLeft',
    SlideDown = 'slideDown',
    SlideRight = ' slideRight',
    SlideUp = 'slideUp',
    SlideLeft = 'slideLeft'
}

export interface NavigationTransition {
    type: TransitionType;
    duration?: number;
}

export interface NavigationOptions {
    clearHistory?: boolean;
    animated?: boolean;
    transition?: NavigationTransition;
}