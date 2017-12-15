import { 
    AfterViewInit,
    Component,
    ViewChild
} from '@angular/core';

import {
    AlertDialog,
    ConfirmDialog,
    AlertDialogDirective,
    ConfirmResult,
    TabGroupDirective,
    ListSectionDirective
} from 'titanium-angular';

@Component({
    //moduleId: module.id,
    selector: "renderer-test",
    templateUrl: "./renderer-test.html"
})
export class RendererTestComponent implements AfterViewInit {

    @ViewChild(TabGroupDirective) tabGroup: TabGroupDirective;

    @ViewChild(ListSectionDirective) listSection: ListSectionDirective;

    @ViewChild('templateAlertDialog') templateAlertDialog: AlertDialogDirective;

    public fruitItems: Array<any>;

    constructor() {
        this.fruitItems = [
            { 
                name: { text: 'Apple' },
                template: 'test'
            },
            {
                name: { text: 'Banana' },
                template: 'test'
            }
        ];
    }

    ngAfterViewInit() {
        this.tabGroup.open();
    }

    onOpen() {
        console.log('Tab group opened!');
    }

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

    onLabelClick(event: any) {
        alert(`Label text: ${event.source.text}`);
    }

    onRefreshStart(event: any) {
        setTimeout(() => {
            this.fruitItems.push({
                name: { text: 'Pineapple' },
                template: 'test'
            });
            this.listSection.items = this.fruitItems;
            event.source.endRefreshing();
        }, 2000);
    }

}