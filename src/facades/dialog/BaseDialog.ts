import { AbstractDialog } from './AbstractDialog'

export class BaseDialog extends AbstractDialog {

    title: string;

    message: string;

    private _alertDialog: Ti.UI.AlertDialog;

    constructor(title: string, message: string) {
        super();

        this.title = title;
        this.message = message;
        this._alertDialog = Ti.UI.createAlertDialog({
            title: this.title,
            message: this.message
        });
        this._alertDialog.addEventListener('click', event => this.handleButtonClick(event));
    }

    get titaniumView(): any {
        return this._alertDialog;
    }

    /**
     * @todo set view from template
     */
    set androidView(androidView: Titanium.UI.View) {
        this._alertDialog.androidView = androidView;
    }

    set style(iosAlertStyle: number) {
        this._alertDialog.style = iosAlertStyle;
    }

    show(): void {
        const buttonNames = [];
        this._actions.forEach((action, index) => {
            buttonNames.push(action.title);
            if (action.isCancelAction) {
                this._alertDialog.cancel = index;
            }
            if (action.isDestructiveAction) {
                this._alertDialog.destructive = index;
            }
        });
        if (buttonNames.length > 0) {
            this._alertDialog.buttonNames = buttonNames;
        }
        this._alertDialog.show();
    }

    private handleButtonClick(event: any) {
        if (this._actions.length === 0) {
            return;
        }

        const targetAction = this._actions[event.index];
        targetAction.handler(event);
    }
}