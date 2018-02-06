import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    templateUrl: './blur-view.component.html'
})
export class BlurViewComponent implements AfterViewInit {
    @ViewChild('blurView') blurViewRef: ElementRef;

    blurLabels: string[] = [
        'Extra Light',
        'Light',
        'Dark'
    ]

    private blurView: Titanium.UI.iOS.BlurView;

    ngAfterViewInit() {
        this.blurView = this.blurViewRef.nativeElement.titaniumView;
    }

    applyBlurEffect(event) {
        const blurEffects = [
            Ti.UI.iOS.BLUR_EFFECT_STYLE_EXTRA_LIGHT,
            Ti.UI.iOS.BLUR_EFFECT_STYLE_LIGHT,
            Ti.UI.iOS.BLUR_EFFECT_STYLE_DARK,
        ]
        this.blurView.setEffect(blurEffects[event.index]);
    }
}