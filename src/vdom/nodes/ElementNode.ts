import {
    AbstractNode,
    ChildNodeInterface,
    NodeType,
    ParentNodeInterface
} from '.';

import {
    ElementCollection
} from '..';

export type EventCallback = (event: any) => any;

/**
 * Represents a default element inside our vdom.
 * 
 * Indivudal elements inherit from this class and add features in their
 * implementation.
 */
export class ElementNode extends AbstractNode implements ChildNodeInterface, ParentNodeInterface {

    attributes: Map<string, any>;

    events: Map<string, Set<EventCallback>>;

    styles: Map<string, any>;

    private _children: ElementCollection;

    constructor(nodeName: string) {
        super();

        this.nodeName = nodeName;
        this.nodeType = NodeType.Element;

        this.attributes = new Map<string, any>();
        this.events = new Map<string, Set<EventCallback>>();
        this.styles = new Map<string, any>();
    }

    get childElementCount() {
        return this.children.length;
    }

    get firstElementChild(): ElementNode {
        for (let child = this.firstChild; child !== null; child = child.nextSibling) {
            if (child.nodeType === NodeType.Element) {
                return <ElementNode>child;
            }
        }

        return null;
    }

    get lastElementChild(): ElementNode {
        for(let child = this.lastChild; child !== null; child = child.previousSibling) {
            if (child.nodeType === NodeType.Element) {
                return <ElementNode>child;
            }
        }

        return null;
    }

    get children(): ElementCollection {
        if (!this._children) {
            this._children = new ElementCollection(this);
        }

        return this._children;
    }

    insertBefore(newChild: AbstractNode, referenceChild: AbstractNode) {
        super.insertBefore(newChild, referenceChild);
        
        this.children.invalidateCache();   
    }

    getAttribute(name: string): any {
        return this.attributes.get(name);
    }

    setAttribute(name: string, value: any, namespace?: string | null): void {
        this.attributes.set(name, value);
    }

    getStyle(propertyName: string): any {
        return this.styles.get(propertyName);
    }

    setStyle(propertyName: string, value: any): void {
        this.styles.set(propertyName, value);
    }

    on(eventName: string, handler: EventCallback): void {
        let eventHandlers = this.events.get(eventName);
        if (!eventHandlers) {
            eventHandlers = new Set<EventCallback>();
            this.events.set(eventName, eventHandlers);
        }
        eventHandlers.add(handler);
    }

    off(eventName: string, handler: EventCallback): void {
        const eventHandlers = this.events.get(eventName);
        if (eventHandlers) {
            eventHandlers.delete(handler);
        }
    }

    remove(): void {
        this.parentNode.removeChild(this);
    }

    updateText(): void {
        // Overriden by actual element implementations
    }

    toString(): string {
        return `${this.constructor.name}(${this.nodeName})`;
    }

}