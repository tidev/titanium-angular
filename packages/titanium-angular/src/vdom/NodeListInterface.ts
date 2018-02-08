import { AbstractNode } from '.';

export interface NodeListInterface<T extends AbstractNode> extends Iterable<T> {
    length: number

    item(index: number): T;

    collectionBegin(): T;

    collectionEnd(): T;

    traverseForward(node: T): T;
}