import {
    CollectionIndexCache,
    NodeInterface,
    NodeIterator,
    NodeListInterface
} from '.';

export class ChildNodeList implements NodeListInterface {
    private _rootNode: NodeInterface;

    private _indexCache: CollectionIndexCache<ChildNodeList>;

    constructor(rootNode: NodeInterface) {
        this._rootNode = rootNode;
        this._indexCache = new CollectionIndexCache<ChildNodeList>(this);
    }

    get length(): number {
        return this._indexCache.nodeCount;
    }

    item(index: number): NodeInterface {
        return this._indexCache.nodeAt(index);
    }

    collectionBegin(): NodeInterface {
        return this._rootNode.firstChild;
    }

    collectionEnd(): NodeInterface {
        return this._rootNode.lastChild;
    }

    traverseForward(node: NodeInterface): NodeInterface {
        return node.nextSibling;
    }

    invalidateCache(): void {
        this._indexCache.invalidate();
    }

    [Symbol.iterator](): Iterator<NodeInterface> {
        return new NodeIterator(this);
    }

}