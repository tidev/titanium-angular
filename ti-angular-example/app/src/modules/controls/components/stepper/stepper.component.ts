import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    templateUrl: './stepper.component.html'
})
export class StepperComponent implements AfterViewInit {

    @ViewChild('state') labelRef: ElementRef;

    stateLabel: Titanium.UI.Label;

    ngAfterViewInit() {
        this.stateLabel = this.labelRef.nativeElement.titaniumView;
    }

    updateLabel(event) {
        const currentValue = event.value.toFixed();
        const maxValue = event.source.maximum;
        this.stateLabel.text = `Current stepper value: ${currentValue} / ${maxValue}.`;
    }

}