import {
    Injectable,
    InjectionToken
} from '@angular/core';

export interface ViewMetadata {
    skipAddToDom?: boolean
}

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

    nextSibling: NodeInterface;

    nodeName: string;

    nodeType: NodeType;

    parentNode; NodeInterface;

    ngCssClasses: Map<string, boolean>;

    appendChild(childNode: NodeInterface): void;
}

export abstract class AbstractNode implements NodeInterface {
    
    childNodes: NodeInterface[];

    firstChild: NodeInterface;

    lastChild: NodeInterface;

    nextSibling: NodeInterface;

    nodeName: string;

    nodeType: NodeType;

    parentNode; NodeInterface;

    ngCssClasses: Map<string, boolean>;

    constructor() {
        this.childNodes = new Array<NodeInterface>();
    }

    appendChild(childNode: NodeInterface): void {
        if (this.childNodes.indexOf(childNode) !== -1) {
            throw new Error(`Cannot add node ${childNode} twice as a child`);
        }

        if (childNode.parentNode) {
            throw new Error(`Child node ${childNode} already has a parent`);
        }

        childNode.parentNode = this;
        this.childNodes.push(childNode);
    }

    removeChild(childNode: NodeInterface): void {

    }

}

export abstract class AbstractTextualNode extends AbstractNode {
    text: string;

    constructor(text: string) {
        super();

        this.text = text;
    }

    toString(): string {
        return `${this.constructor.name}(${this.text});`
    }
}

export class TextNode extends AbstractTextualNode {
    constructor(text: string) {
        super(text);

        this.nodeType = NodeType.Text;
    }
}

export class CommentNode extends AbstractTextualNode {
    constructor(text: string) {
        super(text);

        this.nodeType = NodeType.Comment;
    }
}

export class ElementNode extends AbstractNode {

    attributes: Map<string, any>;

    styles: Map<string, any>;

    constructor(nodeName: string) {
        super();

        this.nodeName = nodeName;
        this.nodeType = NodeType.Element;
    }

    setAttribute(key, value) {
        this.attributes.set(key, value);
    }

    setStyle(property, value) {
        this.styles.set(property, value);
    }

    toString(): string {
        return `${this.constructor.name}(${this.nodeName})`;
    }

}

export class TitaniumElementNode extends ElementNode {

    meta: ViewMetadata;

    titaniumView: any;

    constructor(tagName: string, titaniumView: any) {
        super(tagName);

        this.titaniumView = titaniumView;
    }

    setText(text: string): void {
        /*
        let possibleProperties = ['text', 'title'];
        for (let textProperty of possibleProperties) {
            if (this.hasAttribute(textProperty)) {
                this.setAttribute(textProperty, text);
                break;
            }
        }
        */
        this.titaniumView.setText(text);
    }

    appendChild(childNode: NodeInterface): void {
        super.appendChild(childNode);

        if (childNode instanceof TextNode) {
            this.setText(childNode.text);
            return;
        }

        if (childNode instanceof TitaniumElementNode) {
            let parentView = this.titaniumView;
            let childView = (<TitaniumElementNode>childNode).titaniumView;

            parentView.add(childView);
        }
    }
}

export class RootNode extends TitaniumElementNode {
    constructor(titaniumView: any) {
        super('Root', titaniumView);
    }
}

export interface TitaniumViewElementMeta {
    resolveFactoryFunction: Function
    meta: ViewMetadata
}

export const ELEMENT_REGISTRY = new InjectionToken<TitaniumElementRegistry>('Titanium element registry');

@Injectable()
export class TitaniumElementRegistry {
    elements: Map<any, any>;

    constructor() {
        this.elements = new Map();
    }

    registerElement(tagName: string, resolveFactoryFunction: Function, meta: ViewMetadata): void {
        console.log(`Registering Titanium view as ${tagName} tag (meta: ${JSON.stringify(meta)})`);
        this.elements.set(tagName, {
            resolveFactoryFunction,
            meta
        });
    }

    isTitaniumView(tagName: string): boolean {
        return this.elements.has(tagName);
    }

    getViewFactory(tagName): Function {
        if (!this.isTitaniumView) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName).resolveFactoryFunction();
    }
}