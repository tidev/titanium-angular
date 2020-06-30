import { Component } from '@angular/core'
import { DeviceEnvironment, Logger } from 'titanium-angular';

@Component({
    templateUrl: './web-view.component.html'
})
export class WebViewComponent {
    constructor(private logger: Logger, private device: DeviceEnvironment) {

    }

    onBeforeLoad(event) {
        if (!this.device.runs('windows')) {
            this.logger.debug(`Ti.UI.WebView will start loading content (event: ${JSON.stringify(event)}).`);
        } else {
            this.logger.debug(`Ti.UI.WebView will start loading content.`);
        }
    }

    onLoad(event) {
        if (!this.device.runs('windows')) {
            this.logger.debug(`Ti.UI.WebView completed loading content (event: ${JSON.stringify(event)}).`);
        } else {
            this.logger.debug(`Ti.UI.WebView completed loading content.`);
        }
    }
}