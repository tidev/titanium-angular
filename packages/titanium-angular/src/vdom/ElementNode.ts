import {
    AbstractNode,
    NodeInterface,
    NodeType
} from '.';

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
        let children = [];
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

    setAttribute(name: string, value: any): void {
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