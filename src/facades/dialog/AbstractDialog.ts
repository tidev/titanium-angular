import { DialogAction } from './DialogAction';
import { DialogInterface } from './DialogInterface';

export abstract class AbstractDialog implements DialogInterface {
    protected _actions: DialogAction[] = [];

    get actions() {
        return this._actions;
    }

    set actions(actions: DialogAction[]) {
        this._actions = actions;
    }

    addAction(action: DialogAction): void {
        this._actions.push(action);
    }

    abstract show(): void;

}