import { Component, ViewChild } from '@angular/core'
import { AlertDialog, ConfirmDialog, AlertDialogDirective, ConfirmResult } from 'titanium-angular';

@Component({
    templateUrl: './alert-dialog.component.html'
})
export class AlertDialogComponent  {
    @ViewChild('templateAlertDialog') templateAlertDialog: AlertDialogDirective;

    openAlertDialog() {
        const alertDialog = new AlertDialog({
            title: 'Alert',
            message: 'This is awesome!'
        });
        alertDialog.show().then(() => console.log(`Alert closed`));
    }

    openConfirmDialog() {
        const confirmDialog = new ConfirmDialog({
            title: 'Confirm',
            message: 'Do you want to continue?'
        });
        confirmDialog.show().then((result: ConfirmResult) => {
            if (result === ConfirmResult.Ok) {
                console.log('Confirmed!');
            } else if (result === ConfirmResult.Cancel) {
                console.log('Canceled!');
            }
        });
    }

    openPromptDialog() {
        const dialog = new AlertDialog({
            title: 'Oh no!',
            message: 'Not implemented yet, check back later!'
        });
        dialog.show();
    }

    openCustomDialog() {
        const dialog = new AlertDialog({
            title: 'Oh no!',
            message: 'Not implemented yet, check back later!'
        });
        dialog.show();
    }

    openBasicCustomDialog() {
        this.templateAlertDialog.show();
    }

    handleOkButton(event: any) {
        console.log('Yep, coll stuff indeed!', event);
    }

    handleCancelButton(event: any) {
        console.log('You don\'t seem to be impressed, bummer.', event);
    }
}