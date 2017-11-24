import {
    NodeInterface
} from '.';

export interface NodeListInterface extends Iterable<NodeInterface> {
    length: number

    item(index: number): NodeInterface;

    collectionBegin(): NodeInterface;

    collectionEnd(): NodeInterface;

    traverseForward(node: NodeInterface): NodeInterface;
}