import {
    NodeInterface,
    NodeType
} from '.'

export abstract class AbstractNode implements NodeInterface {

    childNodes: NodeInterface[];

    firstChild: NodeInterface;

    lastChild: NodeInterface;

    previousSibling: NodeInterface;

    nextSibling: NodeInterface;

    nodeName: string;

    nodeType: NodeType;

    parentNode: NodeInterface;

    ngCssClasses: Map<string, boolean>;

    constructor() {
        this.childNodes = new Array<NodeInterface>();
    }

    appendChild(childNode: NodeInterface): void {
        if (this.childNodes.indexOf(childNode) !== -1) {
            throw new Error(`Cannot add node ${childNode} twice as a child`);
        }

        if (childNode.parentNode) {
            throw new Error(`Node ${childNode} already has a parent`);
        }

        childNode.parentNode = this;
        this.childNodes.push(childNode);

        if (!this.firstChild) {
            this.firstChild = childNode;
        }

        if (this.lastChild) {
            childNode.previousSibling = this.lastChild;
            this.lastChild.nextSibling = childNode
        }
        this.lastChild = childNode;
    }

    removeChild(childNode: NodeInterface): void {
        if (!childNode.parentNode) {
            throw new Error(`Cannot remove node ${childNode} because it has no parent.`);
        }

        if (childNode.parentNode !== this) {
            throw new Error(`Cannot remove node ${childNode} because it is no child of ${this}.`);
        }

        childNode.parentNode = null;
        this.childNodes = this.childNodes.splice(this.childNodes.indexOf(childNode));

        if (this.firstChild === childNode) {
            this.firstChild = childNode.nextSibling;
            this.firstChild.previousSibling = null;
        }

        if (this.lastChild === childNode) {
            this.lastChild = childNode.previousSibling;
            this.lastChild.nextSibling = null;
        }
    }

}