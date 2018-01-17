import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { TitaniumElement } from 'titanium-angular';

@Component({
    templateUrl: 'intro.component.html'
})
export class IntroComponent implements AfterViewInit {
    @ViewChild('gradient') gradientElement: ElementRef;

    ngAfterViewInit() {
        const gradientView: Titanium.UI.View = this.gradientElement.nativeElement.titaniumView;
        gradientView.backgroundGradient = {
            type: 'linear',
            startPoint: { x: '0%', y: '50%' },
            endPoint: { x: '100%', y: '50%' },
            colors: [
                { color: '#0d47a1', offset: 0.0 },
                { color: '#42a5f5', offset: 1.0 }
            ]
        };
        gradientView.transform = Titanium.UI.create2DMatrix({rotate: 8}); 
    }
}