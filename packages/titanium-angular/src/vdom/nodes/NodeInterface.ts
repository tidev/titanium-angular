import {
    ElementNode
} from '.';

import {
    ChildNodeList,
    NodeListInterface
} from '..';

export enum NodeType {
    Element = 1,
    Text = 3,
    Comment = 8,
    Document = 9
}

export interface NodeInterface {

    nodeName: string;

    nodeType: NodeType;

    nodeValue: string;

    parentNode: NodeInterface;

    parentElement: ElementNode;

    childNodes: ChildNodeList;

    firstChild: NodeInterface;

    lastChild: NodeInterface;

    previousSibling: NodeInterface;

    nextSibling: NodeInterface;

    ngCssClasses: Map<string, boolean>;

    appendChild(childNode: NodeInterface): void;

    removeChild(childNode: NodeInterface): void;

    insertBefore(newNode: NodeInterface, referenceNode: NodeInterface): void;

}