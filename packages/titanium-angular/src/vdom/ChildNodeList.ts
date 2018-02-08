import {
    AbstractNode,
    CollectionIndexCache,
    NodeIterator,
    NodeListInterface
} from '.';

export class ChildNodeList implements NodeListInterface<AbstractNode> {
    private _rootNode: AbstractNode;

    private _indexCache: CollectionIndexCache<AbstractNode, ChildNodeList>;

    constructor(rootNode: AbstractNode) {
        this._rootNode = rootNode;
        this._indexCache = new CollectionIndexCache(this);
    }

    get length(): number {
        return this._indexCache.nodeCount;
    }

    item(index: number): AbstractNode {
        return this._indexCache.nodeAt(index);
    }

    collectionBegin(): AbstractNode {
        return this._rootNode.firstChild;
    }

    collectionEnd(): AbstractNode {
        return this._rootNode.lastChild;
    }

    traverseForward(node: AbstractNode): AbstractNode {
        return node.nextSibling;
    }

    invalidateCache(): void {
        this._indexCache.invalidate();
    }

    [Symbol.iterator](): Iterator<AbstractNode> {
        return new NodeIterator(this);
    }

}