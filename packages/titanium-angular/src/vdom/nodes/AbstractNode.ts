import { ChildNodeList } from '..';
import { ElementNode } from '.'

export enum NodeType {
    Element = 1,
    Text = 3,
    Comment = 8,
    Document = 9
} 

export abstract class AbstractNode {

    nodeName: string;

    nodeType: NodeType;

    parentNode: AbstractNode;

    firstChild: AbstractNode;

    ngCssClasses: Map<string, boolean>;

    protected _nodeValue;

    private _childNodes: ChildNodeList;

    private _nextSibling: AbstractNode;

    private _previousSibling: AbstractNode;

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
            return this.firstChild._previousSibling;
        }

        return null;
    }

    get nextSibling(): AbstractNode {
        if (this.parentNode === null) {
            return null;
        }

        const nextSibling = this._nextSibling;
        if (this.parentNode.firstChild === nextSibling) {
            return null;
        }

        return nextSibling;
    }

    get previousSibling(): AbstractNode {
        if (this.parentNode === null) {
            return null;
        }

        const previousSibling = this._previousSibling;
        if (this.parentNode.lastChild === previousSibling) {
            return null;
        }

        return previousSibling;
    }

    get nextElementSibling(): ElementNode {
        for (let child = this.nextSibling; child !== null; child = child.nextSibling) {
            if (child.nodeType === NodeType.Element) {
                return <ElementNode>child;
            }
        }

        return null;
    }

    get previousElementSibling(): ElementNode {
        for (let child = this.previousSibling; child !== null; child = child.previousSibling) {
            if (child.nodeType === NodeType.Element) {
                return <ElementNode>child;
            }
        }

        return null;
    }

    appendChild(childNode: AbstractNode): void {
        this.insertBefore(childNode, null);
    }

    removeChild(oldChild: AbstractNode): void {
        if (oldChild.parentNode !== this) {
            throw new Error(`Child node ${oldChild} not found inside ${this}`);
        }

        const previousChild = oldChild._previousSibling;
        const nextChild = oldChild._nextSibling;
        
        if (previousChild === oldChild) {
            return;
        }
        previousChild._nextSibling = nextChild;
        nextChild._previousSibling = previousChild;
        oldChild._previousSibling = oldChild._nextSibling = oldChild;

        this.childNodes.invalidateCache();
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
            referenceNode = this.firstChild;
        }

        if (referenceNode) {
            newNode._previousSibling = referenceNode._previousSibling;
            newNode._nextSibling = referenceNode;
            referenceNode._previousSibling._nextSibling = newNode;
            referenceNode._previousSibling = newNode;
        } else {
            this.firstChild = newNode;
        }
        
        this.childNodes.invalidateCache();
    }

}