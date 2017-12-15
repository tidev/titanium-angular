import {
    AbstractAngularElement,
    InvisibleElement
} from '.';

import {
    AbstractNode,
    ElementNode,
    NodeInterface,
    TextNode
} from '..';

import {
    Logger
} from '../../log';

import {
    DeviceEnvironment
} from '../../services';

import {
    camelize,
    capitalizeFirstLetter
} from '../../utility/string';
import { Directive } from '@angular/core/src/metadata/directives';

export interface ViewMetadata {
    skipAddToDom?: boolean,
    typeName: String
}

export class TitaniumElement extends AbstractAngularElement {

    meta: ViewMetadata;

    titaniumView: any;

    private logger: Logger;

    private device: DeviceEnvironment;

    constructor(nodeName: string, titaniumView: any, logger: Logger, device: DeviceEnvironment) {
        super(nodeName);

        this.titaniumView = titaniumView;
        this.logger = logger;
        this.device = device;
    }

    getAttribute(name: string): any {

    }

    getElementAttribute(name: string): any {
        return super.getAttribute(name);
    }

    setAttribute(name: string, value: any, namespace?: string | null): void {
        super.setAttribute(name, value, namespace);

        if (namespace && !this.device.runsIn(namespace)) {
            return;
        }

        let propertyName = camelize(name);
        let setterName = 'set' + capitalizeFirstLetter(propertyName);

        if (Reflect.has(this.titaniumView, setterName) && typeof this.titaniumView[setterName] === 'function') {
            this.logger.debug(`${this}.setAttribute via setter: ${setterName}(${JSON.stringify(value)})`);
            this.titaniumView[setterName](value);
            return;
        }

        if (Reflect.has(this.titaniumView, propertyName)) {
            this.logger.debug(`${this}.setAttribute via property: ${propertyName}(${JSON.stringify(value)})`);
            this.titaniumView[propertyName] = value;
            return;
        }

        this.logger.debug(`${this.nodeName} has no property ${propertyName} or matching setter ${setterName} to set attribute ${name}.`);
    }

    hasAttributeAccessor(name: string): boolean {
        let acessorNames = [name, `set${capitalizeFirstLetter(camelize(name))}`];
        return acessorNames.some(accessorName => {
            return Reflect.has(this.titaniumView, accessorName)
        });
    }

    public setText(text: string): void {
        let possibleProperties = ['text', 'title'];
        for (let textProperty of possibleProperties) {
            if (this.hasAttributeAccessor(textProperty)) {
                this.setAttribute(textProperty, text, null);
                break;
            }
        }
    }

    /**
     * Reads text from all text child nodes and updates the title or text property of the 
     * underlying Titanium view
     */
    updateText(): void {
        let updatedText = '';
        for (let child = this.firstChild; child !== null; child = child.nextSibling) {
            if (child instanceof TextNode) {
                updatedText = child.nodeValue;
            }
        }
        updatedText = updatedText.replace(/^\s+|\s+$/g, '');
        if (updatedText !== '') {
            this.setText(updatedText);
        }
    }

    insertBefore(newNode: NodeInterface, referenceNode: NodeInterface): void {
        super.insertBefore(<AbstractNode>newNode, <AbstractNode>referenceNode);

        if (newNode instanceof TextNode) {
            this.updateText();
            return;
        }

        if (newNode instanceof TitaniumElement) {
            this.insertChild(newNode);
        }

        if (newNode instanceof InvisibleElement) {
            // @todo Lift up any Titanium child elements into the visual tree
        }
    }

    insertIntoVisualTree(child: AbstractAngularElement, atIndex?: number) {
        this.logger.trace(`TitaniumElement.insertIntoVisualTree(${child})`);

        if (child instanceof TitaniumElement) {
            this.insertChild(child, atIndex);
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

    private insertChild(element: TitaniumElement, atIndex?: number): void {
        if (element.meta.skipAddToDom) {
            this.logger.trace(`Element ${element} is detached from the visual tree, skip adding to parent ${this}`);
            return;
        }

        let parentView = this.titaniumView;
        let childView = element.titaniumView;

        if (atIndex === null) {
            parentView.add(childView);
        } else {
            parentView.insertAt({
                view: childView,
                position: atIndex
            });
        }
    }
}