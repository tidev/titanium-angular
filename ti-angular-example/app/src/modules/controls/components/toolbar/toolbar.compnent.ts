import { Component } from '@angular/core';
import { Logger, LayoutBehaviorType, TitaniumRouter } from 'titanium-angular';

@Component({
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

    LayoutBehaviorType = LayoutBehaviorType;

    constructor(private logger: Logger, private router: TitaniumRouter) {

    }

    send(event) {
        this.logger.info('Pressed "Send" button!');
    }

    openCamera(event) {
        this.logger.info('Pressed "Camera" button!');
    }

    cancel(event) {
        this.router.back();
    }
    
}