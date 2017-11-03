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

    setText(text: string): void {
        let possibleProperties = ['text', 'title'];
        for (let textProperty of possibleProperties) {
            if (this.hasAttributeAccessor(textProperty)) {
                this.setAttribute(textProperty, text);
                break;
            }
        }
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

    on(eventName: string, handler: Function): void {
        super.on(eventName, handler);

        this.titaniumView.addEventListener(eventName, handler)
    }

    off(eventName: string, handler: Function): void {
        super.off(eventName, handler);

        this.titaniumView.removeEventListener(eventName, handler);
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

function camelize(value: string): string {
    return value.replace(/-(\w)/g, (match, firstSubMatch) => firstSubMatch ? firstSubMatch.toUpperCase() : '');
}

function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}