import {
    NodeInterface,
    NodeListInterface
} from '.';

export class NodeIterator implements Iterator<NodeInterface> {

    private _list: NodeListInterface;

    private _index: number;

    constructor(list: NodeListInterface) {
        this._list = list;
        this._index = 0;
    }

    next(): IteratorResult<NodeInterface> {
        return {
            done: this._index >= this._list.length,
            value: this._list.item(this._index++)
        }
    }
}