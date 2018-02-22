import { Component } from '@angular/core'
import { Logger } from 'titanium-angular';

@Component({
    templateUrl: './text-area.component.html'
})
export class TextAreaComponent {

    private focussedArea: Titanium.UI.TextArea;

    constructor(private logger: Logger) {

    }

    deselectTextArea() {
        if (this.focussedArea) {
            this.focussedArea.blur();
            this.focussedArea = null;
        }
    }

    logText(event) {
        this.logger.debug(`Text area value changed to ${event.value}`);
    }

    logFocus(event) {
        this.logger.debug('Text area focussed.');
        this.focussedArea = event.source;
    }

    logBlur() {
        this.logger.debug('Text area blurred.');
    }
}