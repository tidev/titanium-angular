import { BaseDialog } from './BaseDialog';
import { DialogAction } from './DialogAction';
import { PresetDialogInterface } from './PresetDialogInterface'
import { PresetDialogOptions } from './PresetDialogInterface';

export abstract class AbstractPresetDialog<T> implements PresetDialogInterface {
    protected _dialog: BaseDialog;

    protected _okAction: DialogAction;

    protected _neutralAction: DialogAction = null;

    protected _cancelAction: DialogAction = null;

    constructor(options: PresetDialogOptions) {
        this._dialog = new BaseDialog(options.title, options.message);
    }

    public abstract show(): Promise<T>;

    protected initializeOkAction(buttonTitle: string) {
        this._okAction = new DialogAction(buttonTitle);
        this._dialog.addAction(this._okAction);
    }

    protected initializeNeutralAction(buttonTitle: string) {
        this._neutralAction = new DialogAction(buttonTitle);
        this._dialog.addAction(this._neutralAction);
    }

    protected initalizeCancelAction(buttonTitle: string) {
        this._cancelAction = new DialogAction(buttonTitle);
        this._cancelAction.cancel = true;
        this._dialog.addAction(this._cancelAction);
    }

}