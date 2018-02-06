import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    templateUrl: './slider.component.html'
})
export class SliderComponent implements AfterViewInit {

    @ViewChild('state') labelRef: ElementRef;

    stateLabel: Titanium.UI.Label;

    ngAfterViewInit() {
        this.stateLabel = this.labelRef.nativeElement.titaniumView;
    }

    updateLabel(event) {
        const currentValue = event.value.toFixed();
        const maxValue = event.source.max;
        this.stateLabel.text = `Current slider value: ${currentValue} / ${maxValue}.`;
    }

}