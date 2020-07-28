import { AbstractPresetDialog } from './AbstractPresetDialog';
import { PresetDialogOptions } from './PresetDialogInterface';

export interface AlertDialogOptions extends PresetDialogOptions {
    okButtonText?: string
}

export class AlertDialog extends AbstractPresetDialog<void> {

    constructor(options: AlertDialogOptions) {
        super(options);

        this.initializeOkAction(options.okButtonText ? options.okButtonText : 'Ok');
    }

    show(): Promise<void> {
        return new Promise(resolve => {
            this._okAction.handler = () => resolve();

            this._dialog.show();
        });
    }
}