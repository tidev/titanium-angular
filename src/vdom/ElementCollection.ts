import {
    CollectionIndexCache,
    ElementNode,
    NodeIterator,
    NodeListInterface
} from '.';

export class ElementCollection implements NodeListInterface<ElementNode> {
    private _rootNode: ElementNode;

    private _indexCache: CollectionIndexCache<ElementNode, ElementCollection>;

    constructor(rootNode: ElementNode) {
        this._rootNode = rootNode;
        this._indexCache = new CollectionIndexCache(this);
    }

    get length(): number {
        return this._indexCache.nodeCount;
    }

    item(index: number): ElementNode {
        return <ElementNode>this._indexCache.nodeAt(index);
    }

    indexOf(node: ElementNode) {
        return this._indexCache.indexOf(node);
    }

    collectionBegin(): ElementNode {
        return this._rootNode.firstElementChild;
    }

    collectionEnd(): ElementNode {
        return this._rootNode.lastElementChild;
    }

    traverseForward(node: ElementNode): ElementNode {
        return node.nextElementSibling;
    }

    invalidateCache(): void {
        this._indexCache.invalidate();
    }

    [Symbol.iterator](): Iterator<ElementNode> {
        return new NodeIterator(this);
    }
}