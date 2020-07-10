import {
    AfterContentInit,
    Component,
    ContentChildren,
    Directive,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList
} from '@angular/core';

import { BaseDialog, DialogAction } from '../facades/dialog';

@Directive({
    selector: 'dialog-action,DialogAction'
})
export class DialogActionDirective implements OnInit {

    @Input() title = '';

    @Input() cancel = false;

    @Input() destructive = false;

    @Output() handler: EventEmitter<any> = new EventEmitter();

    action: DialogAction;

    ngOnInit() {
        this.action = new DialogAction(this.title, (event) => this.handler.emit(event));
        this.action.cancel = this.cancel;
        this.action.destructive = this.destructive;
    }
}

@Component({
    selector: 'alert-dialog,AlertDialog',
    template: `
        <ng-container>
            <loader detached #loader></loader>
            <ng-content></ng-content>
        </ng-container>
    `
})
export class AlertDialogDirective implements OnInit, AfterContentInit {

    private _title: string;

    private _message: string;

    private dialog: BaseDialog;

    @ContentChildren(DialogActionDirective) buttons: QueryList<DialogActionDirective>;

    @Input()
    set title(title: string) {
        this._title = title;
    }

    @Input()
    set message(message: string) {
        this._message = message;
    }

    show(): void {
        this.dialog.show();
    }

    ngOnInit() {
        this.dialog = new BaseDialog(this._title, this._message);
    }

    ngAfterContentInit() {
        this.buttons.forEach(dialogAction => this.dialog.addAction(dialogAction.action));
    }
}