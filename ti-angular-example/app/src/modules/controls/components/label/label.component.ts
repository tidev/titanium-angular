import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'

@Component({
    templateUrl: './label.component.html'
})
export class LabelComponent implements AfterViewInit {
    @ViewChild('label') labelRef: ElementRef;

    private label: Titanium.UI.Label;

    ngAfterViewInit() {
        this.label = this.labelRef.nativeElement.titaniumView;
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