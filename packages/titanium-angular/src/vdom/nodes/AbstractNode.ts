import {
    ChildNodeList
} from '..';

import {
    NodeInterface,
    NodeType,
    ElementNode
} from '.'

export abstract class AbstractNode implements NodeInterface {

    nodeName: string;

    nodeType: NodeType;

    parentNode: NodeInterface;

    firstChild: NodeInterface;

    ngCssClasses: Map<string, boolean>;

    protected _nodeValue;

    private _childNodes: ChildNodeList;

    private _nextSibling: NodeInterface;

    private _previousSibling: NodeInterface;

    constructor() {
        this.parentNode = null;
        this.firstChild = null;
        this._nextSibling = this;
        this._previousSibling = this;
    }

    get nodeValue() {
        return null;
    }

    set nodeValue(value: string) {
        // Will be overriden by comment and text nodes
    }

    get parentElement(): ElementNode {
        const ancestor = this.parentNode;
        return ancestor !== null && ancestor.nodeType === NodeType.Element ? <ElementNode>ancestor : null;
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

    removeChild(oldChild: AbstractNode): void {
        if (oldChild.parentNode !== this) {
            throw new Error(`Child node ${oldChild} not found inside ${this}`);
        }

        const previousChild = <AbstractNode>oldChild.previousSibling;
        const nextChild = <AbstractNode>oldChild.nextSibling;

        if (nextChild) {
            nextChild._previousSibling = previousChild;
            oldChild._nextSibling = null;
        }

        if (previousChild) {
            previousChild._nextSibling = nextChild;
            oldChild._previousSibling = null;
        }

        oldChild.parentNode = null;
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
            newNode._nextSibling = referenceNode;
            (<AbstractNode>referenceNode._previousSibling)._nextSibling = newNode;
            referenceNode._previousSibling = newNode;
        } else {
            this.firstChild = newNode;
        }
        
        this.childNodes.invalidateCache();
    }

}