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
    logger: Logger,
    device: DeviceEnvironment
}

export class TitaniumRenderer extends Renderer2 {
    private elementRegistry: TitaniumElementRegistry;

    private logger: Logger;

    private device: DeviceEnvironment;

    constructor(configuration: TitaniumRendererConfiguration, private zone: NgZone) {
        super();

        this.elementRegistry = configuration.elementRegistry;
        this.logger = configuration.logger;
        this.device = configuration.device;
    }

    get data(): { [key: string]: any } {
        return Object.create(null);
    }

    destroy(): void {
        this.logger.trace('TitaniumRenderer.destroy');
    }

    createElement(name: string, namespace?: string | null): ElementNode {
        name = namespace ? `${namespace}:${name}` : name;
        this.logger.debug(`TitaniumRenderer.createElement ${name}`);
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
        this.logger.debug(`TitaniumRenderer.appendChild ${newChild} -> ${parent}`);
        if (!parent) {
            this.logger.debug(`No parent to add child ${newChild}, skipping.`);
            return;
        }

        parent.appendChild(newChild);
    }

    insertBefore(parent: ElementNode, newChild: AbstractNode, refChild: AbstractNode): void {
        this.logger.debug(`TitaniumRenderer.insertBefore ${newChild} before ${refChild} in ${parent}`);
        if (!parent) {
            this.logger.debug(`No parent to insert child ${newChild}, skipping.`);
            return;
        }

        parent.insertBefore(newChild, refChild);
    }

    removeChild(parent: ElementNode, oldChild: AbstractNode): void {
        // this.logger.debug(`TitaniumRenderer.removeChild ${oldChild} from ${parent}`);
        if (!parent) {
            this.logger.debug(`Child ${oldChild} has no parent, skipping.`);
            return;
        }

        parent.removeChild(oldChild);
    }

    selectRootElement(selectorOrNode: string | any): ElementNode {
        // this.logger.debug(`TitaniumRenderer.selectRootElement ${selectorOrNode}`);
        return new EmulatedRootElement();
    }

    parentNode(node: AbstractNode): AbstractNode {
        // this.logger.debug(`TitaniumRenderer.parentNode(${node}) -> ${node.parentNode}`);
        return node.parentNode;
    }

    nextSibling(node: AbstractNode): AbstractNode {
        // this.logger.debug(`TitaniumRenderer.nextSibling(${node}) -> ${node.nextSibling}`);
        return node.nextSibling;
    }

    setAttribute(el: ElementNode, name: string, value: string, namespace?: string | null): void {
        // this.logger.debug(`TitaniumRenderer.setAttribute(${el}, ${name}, ${value}, ${namespace})`);
        if (namespace) {
            el.setAttributeNS(namespace, name, value);
        } else {
            el.setAttribute(name, value);
        }
    }

    removeAttribute(el: ElementNode, name: string, namespace?: string | null): void {
        // this.logger.debug(`TitaniumRenderer.removeAttribute`);
        if (namespace) {
            el.removeAttributeNS(namespace, name);
        } else {
            el.removeAttribute(name);
        }
    }

    addClass(el: any, name: string): void {
        this.logger.debug(`TitaniumRenderer.addClass`);
    }

    removeClass(el: any, name: string): void {
        this.logger.debug(`TitaniumRenderer.removeClass`);
    }

    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
        this.logger.debug(`TitaniumRenderer.setStyle`);
    }

    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
        this.logger.debug(`TitaniumRenderer.removeStyle`);
    }

    setProperty(el: any, name: string, value: any): void {
        // this.logger.debug(`TitaniumRenderer.setProperty(${el}, ${name}, ${value})`);
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
        // this.logger.debug(`TitaniumRenderer.setValue(${node}, ${value})`);
        node.nodeValue = value;
    }

    listen(target: ElementNode, eventName: string, callback: (event: any) => boolean | void): () => void {
        // this.logger.debug(`TitaniumRenderer.listen ${target} ${eventName}`);

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