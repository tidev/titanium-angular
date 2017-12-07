export class DialogAction {
    title: string = '';

    handler: Function = (event?: any) => {};

    private _cancel: boolean = false;

    private _destructive: boolean = false;

    constructor(title: string, handler?: Function) {
        this.title = title;
        this.handler = handler ? handler : () => {};
    }

    get isCancelAction() {
        return this._cancel;
    }

    set cancel(cancel: boolean) {
        this._cancel = cancel;
    }

    get isDestructiveAction(): boolean {
        return this._destructive;
    }

    set destructive(destructive: boolean) {
        this._destructive = destructive;
    }
}