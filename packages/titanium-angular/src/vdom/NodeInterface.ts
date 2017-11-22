export enum NodeType {
    Element = 1,
    Text = 3,
    Comment = 8,
    Document = 9
}

export interface NodeInterface {

    childNodes: NodeInterface[];

    firstChild: NodeInterface;

    lastChild: NodeInterface;

    previousSibling: NodeInterface;

    nextSibling: NodeInterface;

    nodeName: string;

    nodeType: NodeType;

    parentNode: NodeInterface;

    ngCssClasses: Map<string, boolean>;

    appendChild(childNode: NodeInterface): void;

    removeChild(childNode: NodeInterface): void;
}