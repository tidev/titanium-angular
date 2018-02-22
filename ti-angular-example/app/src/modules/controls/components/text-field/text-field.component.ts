import { Component } from '@angular/core'
import { Logger } from 'titanium-angular';

@Component({
    templateUrl: './text-field.component.html'
})
export class TextFieldComponent {

    private focussedField: Titanium.UI.TextField;

    constructor(private logger: Logger) {

    }

    deselectTextField() {
        if (this.focussedField) {
            this.focussedField.blur();
            this.focussedField = null;
        }
    }

    logText(event) {
        this.logger.debug(`Text field value changed to ${event.value}`);
    }

    logFocus(event) {
        this.logger.debug('Text field focussed.');
        this.focussedField = event.source;
    }

    logBlur() {
        this.logger.debug('Text field blurred.');
    }
}