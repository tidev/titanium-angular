import {
    ChildNodeList,
    NodeInterface,
    NodeType,
    ElementNode,
    EmulatedRootNode
} from '.'

export abstract class AbstractNode implements NodeInterface {

    nodeName: string;

    nodeType: NodeType;

    parentNode: NodeInterface;

    firstChild: NodeInterface;

    ngCssClasses: Map<string, boolean>;

    private _childNodes: ChildNodeList;

    private _nextSibling: NodeInterface;

    private _previousSibling: NodeInterface;

    constructor() {
        this.parentNode = null;
        this.firstChild = null;
        this._nextSibling = this;
        this._previousSibling = this;
    }

    get parentElement(): ElementNode {
        const ancestor = this.parentNode;
        return ancestor.nodeType === NodeType.Element ? <ElementNode>ancestor : null;
    }

    get childNodes(): ChildNodeList {
        if (!this._childNodes) {
            this._childNodes = new ChildNodeList(this);
        }

        return this._childNodes;
    }

    get lastChild() {
        if (this.firstChild) {
            return this.firstChild.previousSibling;
        }

        return null;
    }

    get nextSibling(): NodeInterface {
        if (this.parentNode === null) {
            return null;
        }

        const nextSibling = this._nextSibling;
        if (this.parentNode.firstChild === nextSibling) {
            return null;
        }

        return nextSibling;
    }

    get previousSibling(): NodeInterface {
        if (this.parentNode === null) {
            return null;
        }

        const previousSibling = this._previousSibling;
        if (this.parentNode.firstChild === previousSibling) {
            return null;
        }

        return previousSibling;
    }

    appendChild(childNode: AbstractNode): void {
        this.insertBefore(childNode, null);
    }

    removeChild(childNode: AbstractNode): void {
        const previousSibling = childNode.previousSibling;
        if (previousSibling === childNode) {
            return;
        }
    }

    /**
     * @todo Improve performance when node already has a parent
     * @param newNode 
     * @param referenceNode 
     */
    insertBefore(newNode: AbstractNode, referenceNode: AbstractNode): void {
        if (newNode.parentNode !== null) {
            newNode.parentNode.removeChild(newNode);
        }

        newNode.parentNode = this;

        if (referenceNode === null) {
            referenceNode = <AbstractNode>this.firstChild;
        }

        if (referenceNode) {
            newNode._previousSibling = referenceNode._previousSibling;
            newNode._nextSibling = referenceNode._nextSibling;
            (<AbstractNode>referenceNode._previousSibling)._nextSibling = newNode;
            referenceNode._previousSibling = newNode._previousSibling;
        } else {
            this.firstChild = newNode;
        }
        
        this.childNodes.invalidateCache();
    }

}