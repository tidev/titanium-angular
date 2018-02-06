import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { DeviceEnvironment } from 'titanium-angular';

@Component({
    templateUrl: './label.component.html'
})
export class LabelComponent implements AfterViewInit {
    @ViewChild('label') labelRef: ElementRef;

    @ViewChildren('buttons') buttons: QueryList<ElementRef>;

    private label: Titanium.UI.Label;

    constructor(private device: DeviceEnvironment) {

    }

    ngAfterViewInit() {
        this.label = this.labelRef.nativeElement.titaniumView;
        console.log(this.buttons.length);

        if (this.device.runs('android')) {
            this.buttons.forEach((buttonElementRef) => {
                const button = buttonElementRef.nativeElement.titaniumView;
                button.tint = '#1976d2';
                button.width = '300';
            });
        }
    }

    changeToCenterAlignment() {
        this.label.textAlign = 'center';
    }

    changeToLeftAlignment() {
        this.label.textAlign = 'left';
    }

    changeToRightAlignment() {
        this.label.textAlign = 'right';
    }

    changeToJustifyAlignment() {
       this.label.textAlign = 3;
    }

    changeColor() {
        this.label.color = '#dd0331';
    }
}