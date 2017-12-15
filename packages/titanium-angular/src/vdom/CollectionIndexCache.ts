import {
    NodeInterface,
    NodeListInterface
} from '.';

export class CollectionIndexCache<T extends NodeListInterface> {

    private _collection: T;

    private _cachedList: Array<NodeInterface>

    private _nodeCount: number;

    private _initialized: boolean;

    constructor(collection: T) {
        this._collection = collection;
        this._cachedList = [];
        this._initialized = false;
    }

    get nodeCount() {
        if (!this._initialized) {
            this.updateNodeCountAndListCache();
            this._initialized = true;
        }

        return this._nodeCount;
    }

    nodeAt(index: number) {
        if (!this._initialized) {
            this.updateNodeCountAndListCache();
            this._initialized = true;
        }

        if (index >= this._nodeCount) {
            return null;
        }

        return this._cachedList[index];
    }

    indexOf(node: NodeInterface): number {
        return this._cachedList.indexOf(node);
    }

    updateNodeCountAndListCache() {
        let nodeCount = 0;
        for (let child = this._collection.collectionBegin(); child !== null; child = this._collection.traverseForward(child)) {
            nodeCount++;
            this._cachedList.push(child);
        }
        this._nodeCount = nodeCount;
    }

    invalidate() {
        this._cachedList = [];
        this._nodeCount = 0;
        this._initialized = false;
    }
}