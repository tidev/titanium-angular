import {
    AfterContentInit,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList
} from '@angular/core';

import { BaseDialog, DialogAction } from '../facades/dialog';

@Directive({
    selector: 'dialog-actionw,DialogAction'
})
export class DialogActionDirective implements OnInit {

    private _title: string = '';

    private _cancel: boolean = false;

    private _destructive: boolean = false;

    private dialogAction: DialogAction;

    @Output() handler: EventEmitter<any> = new EventEmitter();

    @Input()
    set title(title: string) {
        this._title = title;
    }

    @Input()
    set cancel(cancel: boolean) {
        this._cancel = cancel;
    }

    @Input()
    set destructive(destructive: boolean) {
        this._destructive = destructive;
    }

    get action(): DialogAction {
        return this.dialogAction;
    }

    ngOnInit() {
        this.dialogAction = new DialogAction(this._title, (event) => this.handler.emit(event));
        this.dialogAction.cancel = this._cancel;
        this.dialogAction.destructive = this._destructive;
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