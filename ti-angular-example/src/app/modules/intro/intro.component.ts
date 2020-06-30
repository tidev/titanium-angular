import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    VERSION
} from '@angular/core';
import { DeviceEnvironment } from 'titanium-angular';

@Component({
    templateUrl: 'intro.component.html'
})
export class IntroComponent implements AfterViewInit, OnInit {

    @ViewChild('window', { static: false }) windowElement: ElementRef;

    @ViewChild('gradient', { static: false }) gradientElement: ElementRef;

    @ViewChild('imageView', { static: false }) imageViewElement: ElementRef;

    skyGradient: Gradient;

    angularVersion = VERSION.full

    constructor(private device: DeviceEnvironment) {

    }

    ngOnInit() {
        this.skyGradient = {
            type: 'linear',
            startPoint: { x: '0%', y: '50%' },
            endPoint: { x: '100%', y: '50%' },
            colors: [
                { color: '#0d47a1', offset: 0.0 },
                { color: '#42a5f5', offset: 1.0 }
            ]
        };
    }

    ngAfterViewInit() {
        if (this.device.runs('android')) {
            const window = <Titanium.UI.Window>this.windowElement.nativeElement.titaniumView;
            window.activity.onStart = () => {
                window.activity.actionBar.hide();
            }
        }

        const gradientView: Titanium.UI.View = this.gradientElement.nativeElement.titaniumView;
        gradientView.transform = Titanium.UI.createMatrix2D({rotate: 8});
    }

    onClick() {
        console.log('button onclick');
    }
}