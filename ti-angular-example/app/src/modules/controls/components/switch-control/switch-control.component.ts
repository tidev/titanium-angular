import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    templateUrl: './switch-control.component.html'
})
export class SwitchControlComponent implements AfterViewInit {

    @ViewChild('state') labelRef: ElementRef;

    stateLabel: Titanium.UI.Label;

    ngAfterViewInit() {
        this.stateLabel = this.labelRef.nativeElement.titaniumView;
    }

    changeLabelText(event) {
        this.stateLabel.text = `The switch is now ${event.value ? 'on' : 'off'}.`;
    }

}