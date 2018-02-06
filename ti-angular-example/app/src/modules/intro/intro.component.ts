import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { TitaniumElement, DeviceEnvironment } from 'titanium-angular';

@Component({
    templateUrl: 'intro.component.html'
})
export class IntroComponent implements AfterViewInit, OnInit {

    @ViewChild('window') windowElement: ElementRef;

    @ViewChild('gradient') gradientElement: ElementRef;

    @ViewChild('imageView') imageViewElement: ElementRef;

    skyGradient: Titanium.UI.Gradient;

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

            // @todo: Figure out why we need to to this manually here
            const imageView = <Titanium.UI.ImageView>this.imageViewElement.nativeElement.titaniumView;
            const angularImageFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'images/angular.png');
            imageView.image = angularImageFile;
        }

        const gradientView: Titanium.UI.View = this.gradientElement.nativeElement.titaniumView;
        gradientView.transform = Titanium.UI.create2DMatrix({rotate: 8});
    }
}