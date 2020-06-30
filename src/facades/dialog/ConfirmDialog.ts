import { AbstractPresetDialog } from './AbstractPresetDialog';
import { AlertDialogOptions } from './AlertDialog';

export interface ConfirmDialogOptions extends AlertDialogOptions {
    neutralButtonText?: string,
    cancelButtonText?: string
}

export enum ConfirmResult {
    Ok,
    Neutral,
    Cancel
}

export class ConfirmDialog extends AbstractPresetDialog<ConfirmResult> {

    constructor(options: ConfirmDialogOptions) {
        super(options);

        this.initializeOkAction(options.okButtonText ? options.okButtonText : 'Ok');
        if (options.neutralButtonText) {
            this.initializeNeutralAction(options.neutralButtonText);
        }
        this.initalizeCancelAction(options.cancelButtonText ? options.cancelButtonText : 'Cancel');
    }

    show(): Promise<ConfirmResult> {
        return new Promise(resolve => {
            this._okAction.handler = () => resolve(ConfirmResult.Ok);
            if (this._neutralAction !== null) {
                this._neutralAction.handler = () => resolve(ConfirmResult.Neutral);
            }
            this._cancelAction.handler = () => resolve(ConfirmResult.Cancel);

            this._dialog.show();
        });
    }
}