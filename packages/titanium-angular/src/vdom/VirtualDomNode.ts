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

    previousSibling: NodeInterface;

    nextSibling: NodeInterface;

    nodeName: string;

    nodeType: NodeType;

    parentNode: NodeInterface;

    ngCssClasses: Map<string, boolean>;

    appendChild(childNode: NodeInterface): void;

    removeChild(childNode: NodeInterface): void;
}

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

export abstract class AbstractTextualNode extends AbstractNode {
    text: string;

    constructor(text: string) {
        super();

        this.text = text;
    }

    toString(): string {
        return `${this.constructor.name}("${this.text}")`;
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

    firstElementChild: ElementNode;

    lastElementChild: ElementNode;

    previousElementSibling: ElementNode;

    nextElementSibling: ElementNode;

    attributes: Map<string, any>;

    events: Map<string, Set<Function>>;

    styles: Map<string, any>;

    constructor(nodeName: string) {
        super();

        this.nodeName = nodeName;
        this.nodeType = NodeType.Element;

        this.attributes = new Map<string, any>();
        this.events = new Map<string, Set<Function>>();
        this.styles = new Map<string, any>();
    }

    get children(): ElementNode[] {
        let children: ElementNode[];
        for (const child of this.childNodes) {
            if (child.nodeType === NodeType.Element) {
                children.push(<ElementNode>child);
            }
        }

        return children;
    }

    getAttribute(name: string): any {
        return this.attributes.get(name);
    }

    setAttribute(name: string, value: any): void{
        this.attributes.set(name, value);
    }

    getStyle(propertyName: string): any {
        return this.styles.get(propertyName);
    }

    setStyle(propertyName: string, value: any): void {
        this.styles.set(propertyName, value);
    }

    appendChild(childNode: NodeInterface): void {
        super.appendChild(childNode);

        if (childNode.nodeType !== NodeType.Element) {
            return;
        }

        const elementNode = <ElementNode>childNode;
        if (!this.firstElementChild) {
            this.firstElementChild = elementNode;
        }

        if (this.lastElementChild) {
            elementNode.previousElementSibling = this.lastElementChild;
            this.lastElementChild.nextElementSibling = elementNode;
        }
        this.lastElementChild = elementNode;
    }

    removeChild(childNode: NodeInterface): void {
        super.appendChild(childNode);

        if (childNode.nodeType !== NodeType.Element) {
            return;
        }

        // @TODO implement
    }

    on(eventName: string, handler: Function): void {
        let eventHandlers = this.events.get(eventName);
        if (!eventHandlers) {
            eventHandlers = new Set<Function>();
            this.events.set(eventName, eventHandlers);
        }
        eventHandlers.add(handler);
    }

    off(eventName: string, handler: Function): void {
        const eventHandlers = this.events.get(eventName);
        if (eventHandlers) {
            eventHandlers.delete(handler);
        }
    }

    toString(): string {
        return `${this.constructor.name}(${this.nodeName})`;
    }

}

export class TitaniumElementNode extends ElementNode {

    meta: ViewMetadata;

    titaniumView: any;

    constructor(nodeName: string, titaniumView: any) {
        super(nodeName);

        this.titaniumView = titaniumView;
    }

    setAttribute(name: string, value: any): void {
        super.setAttribute(name, value);

        let propertyName = camelize(name);
        let setterName = 'set' + capitalizeFirstLetter(propertyName);

        if (this.titaniumView[setterName] && typeof this.titaniumView[setterName] === 'function') {
            console.log(`${this}.setAttribute via setter: ${setterName}(${JSON.stringify(value)})`);
            this.titaniumView[setterName](value);
            return;
        }

        if (this.titaniumView[propertyName]) {
            console.log(`${this}.setAttribute via property: ${propertyName}(${JSON.stringify(value)})`);
            this.titaniumView[propertyName] = value;
            return;
        }

        console.log(`${this.nodeName} has no property ${propertyName} or matching setter ${setterName} to set attribute ${name}.`);
    }

    hasAttributeAccessor(name: string): boolean {
        let acessorNames = [name, `set${capitalizeFirstLetter(camelize(name))}`];
        return acessorNames.some(accessorName => Reflect.has(this.titaniumView, accessorName));
    }

    public setText(text: string): void {
        let possibleProperties = ['text', 'title'];
        for (let textProperty of possibleProperties) {
            if (this.hasAttributeAccessor(textProperty)) {
                this.setAttribute(textProperty, text);
                break;
            }
        }
    }

    /**
     * Updates the text when new TextNodes where added as a child
     */
    private updateText(): void {
        let updatedText = '';
        for (const child of this.childNodes) {
            if (child instanceof TextNode) {
                updatedText = child.text;
            }
        }
        updatedText = updatedText.replace(/^\s+|\s+$/g, '');
        if (updatedText !== '') {
            this.setText(updatedText);
        }
    }

    appendChild(childNode: NodeInterface): void {
        super.appendChild(childNode);

        if (childNode instanceof TextNode) {
            this.updateText();
            return;
        }

        if (childNode instanceof TitaniumElementNode) {
            if (childNode.meta.skipAddToDom) {
                return;
            }

            let parentView = this.titaniumView;
            let childView = childNode.titaniumView;

            parentView.add(childView);
        }
    }

    on(eventName: string, handler: Function): void {
        super.on(eventName, handler);

        this.titaniumView.addEventListener(eventName, handler)
    }

    off(eventName: string, handler: Function): void {
        super.off(eventName, handler);

        this.titaniumView.removeEventListener(eventName, handler);
    }
}

export class EmulatedRootNode extends ElementNode {
    constructor() {
        super('Root');
    }
}

export class RootNode extends TitaniumElementNode {
    constructor(titaniumView: any) {
        super('Root', titaniumView);

        this.meta = {};
    }
}

export interface TitaniumViewElementMeta {
    resolveFactory: Function
    meta: ViewMetadata
}

export const ELEMENT_REGISTRY = new InjectionToken<TitaniumElementRegistry>('Titanium element registry');

@Injectable()
export class TitaniumElementRegistry {
    elements: Map<any, TitaniumViewElementMeta>;

    constructor() {
        this.elements = new Map();
    }

    registerElement(tagName: string, resolveFactory: Function, meta: ViewMetadata): void {
        console.log(`Registering Titanium view ${tagName} (meta: ${JSON.stringify(meta)})`);
        this.elements.set(tagName, {
            resolveFactory,
            meta
        });
    }

    isTitaniumView(tagName: string): boolean {
        return this.elements.has(tagName);
    }

    getViewFactory(tagName): Function {
        if (!this.isTitaniumView(tagName)) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName).resolveFactory();
    }

    getViewMetadata(tagName): ViewMetadata {
        if (!this.isTitaniumView(tagName)) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName).meta;
    }
}

function camelize(value: string): string {
    return value.replace(/-(\w)/g, (match, firstSubMatch) => firstSubMatch ? firstSubMatch.toUpperCase() : '');
}

function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}