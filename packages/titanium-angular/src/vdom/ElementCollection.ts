import {
    CollectionIndexCache,
    ElementNode,
    NodeInterface,
    NodeIterator,
    NodeListInterface
} from '.';

export class ElementCollection implements NodeListInterface {
    private _rootNode: ElementNode;

    private _indexCache: CollectionIndexCache<ElementCollection>;

    constructor(rootNode: ElementNode) {
        this._rootNode = rootNode;
        this._indexCache = new CollectionIndexCache<ElementCollection>(this);
    }

    get length(): number {
        return this._indexCache.nodeCount;
    }

    item(index: number): ElementNode {
        return <ElementNode>this._indexCache.nodeAt(index);
    }

    indexOf(node: NodeInterface) {
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

    [Symbol.iterator](): Iterator<NodeInterface> {
        return new NodeIterator(this);
    }
}