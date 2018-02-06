import { Component } from '@angular/core'
import { Logger } from 'titanium-angular';

@Component({
    templateUrl: './tabbed-bar.component.html'
})
export class TabbedBarComponent  {
    constructor(private logger: Logger) {

    }

    logTabbedBarIndex(event) {
        this.logger.debug(`Ti.UI.iOS.TabbedBar changed to index: ${event.index}`);
    }
}