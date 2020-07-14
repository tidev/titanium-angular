import {
    NgZone,
    Renderer2,
    RendererStyleFlags2
} from '@angular/core'

import {
    Logger
} from '../log';

import {
    DeviceEnvironment
} from '../services';

import {
    AbstractNode,
    CommentNode,
    InvisibleElement,
    ElementNode,
    EmulatedRootElement,
    TitaniumElement,
    TitaniumElementRegistry,
    TextNode
} from 'titanium-vdom';

export interface TitaniumRendererConfiguration {
    elementRegistry: TitaniumElementRegistry,
    logger: Logger
}

export class TitaniumRenderer extends Renderer2 {
    private elementRegistry: TitaniumElementRegistry;

    private logger: Logger;

    constructor(configuration: TitaniumRendererConfiguration, private zone: NgZone) {
        super();

        this.elementRegistry = configuration.elementRegistry;
        this.logger = configuration.logger;
    }

    get data(): { [key: string]: any } {
        return Object.create(null);
    }

    destroy(): void {
        this.logger.trace('TitaniumRenderer.destroy');
    }

    createElement(name: string, namespace?: string | null): ElementNode {
        name = namespace ? `${namespace}:${name}` : name;
        if (this.elementRegistry.hasElement(name)) {
            const elementEntry = this.elementRegistry.getElement(name)
            const node = new TitaniumElement(name, elementEntry.resolveFactory(), elementEntry.meta)
            return node;
        }

        return new InvisibleElement(name);
    }

    createComment(value: string): CommentNode {
        // this.logger.debug(`TitaniumRenderer.createComment: ${value}`);
        return new CommentNode(value);
    }

    createText(value: string): TextNode {
        // this.logger.debug(`TitaniumRenderer.createText: ${value}`);
        return new TextNode(value);
    }

    appendChild(parent: ElementNode, newChild: ElementNode): void {
        if (!parent) {
            this.logger.debug(`No parent to add child ${newChild}, skipping.`);
            return;
        }

        parent.appendChild(newChild);
    }

    insertBefore(parent: ElementNode, newChild: AbstractNode, refChild: AbstractNode): void {
        if (!parent) {
            this.logger.debug(`No parent to insert child ${newChild}, skipping.`);
            return;
        }

        parent.insertBefore(newChild, refChild);
    }

    removeChild(parent: ElementNode, oldChild: AbstractNode): void {
        if (!parent) {
            this.logger.debug(`Child ${oldChild} has no parent, skipping.`);
            return;
        }

        parent.removeChild(oldChild);
    }

    selectRootElement(selectorOrNode: string | any): ElementNode {
        return new EmulatedRootElement();
    }

    parentNode(node: AbstractNode): AbstractNode {
        return node.parentNode;
    }

    nextSibling(node: AbstractNode): AbstractNode {
        return node.nextSibling;
    }

    setAttribute(el: ElementNode, name: string, value: string, namespace?: string | null): void {
        if (namespace) {
            el.setAttributeNS(namespace, name, value);
        } else {
            el.setAttribute(name, value);
        }
    }

    removeAttribute(el: ElementNode, name: string, namespace?: string | null): void {
        if (namespace) {
            el.removeAttributeNS(namespace, name);
        } else {
            el.removeAttribute(name);
        }
    }

    addClass(el: any, name: string): void {
        this.logger.debug(`TitaniumRenderer.addClass not supported yet!`);
    }

    removeClass(el: any, name: string): void {
        this.logger.debug(`TitaniumRenderer.removeClass not supported yet!`);
    }

    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
        this.logger.debug(`TitaniumRenderer.setStyle not supported yet!`);
    }

    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
        this.logger.debug(`TitaniumRenderer.removeStyle not supported yet!`);
    }

    setProperty(el: any, name: string, value: any): void {
        if (name.indexOf(':') !== -1) {
            const nameParts = name.split(':');
            const namespace = nameParts[0];
            name = nameParts[1];
            el.setAttributeNS(namespace, name, value);
        } else {
            el.setAttribute(name, value);
        }
    }

    setValue(node: AbstractNode, value: string): void {
        node.nodeValue = value;
    }

    listen(target: ElementNode, eventName: string, callback: (event: any) => boolean | void): () => void {
        // manually run callback inside the Angular zone since zone.js cannot auto
        // patch our proxy event methods.
        let zonedCallback = (...args) => {
            this.zone.run(() => {
                callback.apply(undefined, args);
            });
        }
        target.on(eventName, zonedCallback);
        return () => target.off(eventName, zonedCallback);
    }
}