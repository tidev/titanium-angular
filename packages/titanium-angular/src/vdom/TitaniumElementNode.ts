import {
    AbstractNode,
    ElementNode,
    NodeInterface,
    TextNode
} from '.';

import {
    Logger
} from '../log';

import {
    camelize,
    capitalizeFirstLetter
} from '../utility/string';

export interface ViewMetadata {
    skipAddToDom?: boolean,
    typeName: String
}

export class TitaniumElementNode extends ElementNode {

    meta: ViewMetadata;

    titaniumView: any;

    private logger: Logger;

    constructor(nodeName: string, titaniumView: any, logger: Logger) {
        super(nodeName);

        this.titaniumView = titaniumView;
        this.logger = logger;
    }

    getAttribute(name: string): any {

    }

    getElementAttribute(name: string): any {
        return super.getAttribute(name);
    }

    setAttribute(name: string, value: any): void {
        super.setAttribute(name, value);

        let propertyName = camelize(name);
        let setterName = 'set' + capitalizeFirstLetter(propertyName);

        if (this.titaniumView[setterName] && typeof this.titaniumView[setterName] === 'function') {
            this.logger.debug(`${this}.setAttribute via setter: ${setterName}(${JSON.stringify(value)})`);
            this.titaniumView[setterName](value);
            return;
        }

        if (this.titaniumView[propertyName]) {
            this.logger.debug(`${this}.setAttribute via property: ${propertyName}(${JSON.stringify(value)})`);
            this.titaniumView[propertyName] = value;
            return;
        }

        this.logger.debug(`${this.nodeName} has no property ${propertyName} or matching setter ${setterName} to set attribute ${name}.`);
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
        for (let child = this.firstChild; child !== null; child = child.nextSibling) {
            if (child instanceof TextNode) {
                updatedText = child.text;
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

        if (newNode instanceof TitaniumElementNode) {
            if (newNode.meta.skipAddToDom) {
                return;
            }

            let parentView = this.titaniumView;
            let childView = newNode.titaniumView;

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