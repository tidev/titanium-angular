import { Logger } from '../../log';
import { DeviceEnvironment } from '../../services';
import { camelize, capitalizeFirstLetter } from '../../utility/string';
import { AbstractNode, ElementNode, TextNode, NodeType } from '..';
import { AbstractAngularElement, InvisibleElement } from '.';

export type ProxyFactory = (options: any) => Titanium.Proxy;

export interface ViewMetadata {
    skipAddToDom?: boolean,
    typeName: String
}

export class TitaniumElement extends AbstractAngularElement {

    meta: ViewMetadata;

    private createProxy: ProxyFactory;

    private _titaniumProxy: Titanium.Proxy = null;

    private proxyCreated: boolean = false;

    private logger: Logger;

    private device: DeviceEnvironment;

    constructor(nodeName: string, createProxy: ProxyFactory, logger: Logger, device: DeviceEnvironment) {
        super(nodeName);

        this.createProxy = createProxy;
        this.logger = logger;
        this.device = device;
    }

    get titaniumView(): Titanium.Proxy {
        if (this._titaniumProxy === null) {
            const creationProperties = {};
            this.attributes.forEach((attributeValue, attributeName) => {
                creationProperties[attributeName] = attributeValue;
            });
            this.logger.debug(`Creating proxy for ${this} with options: ${JSON.stringify(creationProperties)}`);
            this._titaniumProxy = this.createProxy(creationProperties);

            this.events.forEach((handlers, eventName) => {
                handlers.forEach(handler => {
                    this.logger.debug(`Adding event listener for ${eventName} to created proxy.`);
                    this._titaniumProxy.addEventListener(eventName, handler);
                });
            });

            this.proxyCreated = true;
        }

        return this._titaniumProxy;
    }

    getAttribute(name: string): any {
        if (this.proxyCreated === false) {
            return this.getElementAttribute(name);
        }

        let propertyName = camelize(name);
        if (!Reflect.has(this.titaniumView, propertyName)) {
            throw new Error(`Unable to get attribute ${name}. ${this} has no matching property named ${propertyName}.`);
        }

        return this.titaniumView[propertyName];
    }

    getElementAttribute(name: string): any {
        return super.getAttribute(name);
    }

    setAttribute(name: string, value: any, namespace?: string | null): void {
        if (namespace && !this.device.runs(namespace)) {
            return;
        }
        
        super.setAttribute(name, value, namespace);

        if (this.proxyCreated === false) {
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
            let possibleProperties = ['text', 'title'];
            for (let textProperty of possibleProperties) {
                if (this.hasAttributeAccessor(textProperty)) {
                    this.setAttribute(textProperty, updatedText, null);
                    break;
                }
            }
        }
    }

    insertBefore(newNode: AbstractNode, referenceNode: AbstractNode): void {
        super.insertBefore(newNode, referenceNode);

        if (newNode instanceof TextNode) {
            this.updateText();
        }

        if (newNode instanceof TitaniumElement) {
            // @todo find nearest visual sibling based on reference node and insert at that index
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

        if (this.proxyCreated) {
            this.titaniumView.addEventListener(eventName, handler);
        }
    }

    off(eventName: string, handler: Function): void {
        super.off(eventName, handler);

        if (this.proxyCreated) {
            this.titaniumView.removeEventListener(eventName, handler);
        }
    }

    private insertChild(element: TitaniumElement, atIndex?: number): void {
        if (element.meta.skipAddToDom) {
            this.logger.trace(`Element ${element} is detached from the visual tree, skip adding to parent ${this}`);
            return;
        }

        let parentView = <Titanium.UI.View>this.titaniumView;
        let childView = <Titanium.UI.View>element.titaniumView;
        if (atIndex === null || atIndex === undefined) {
            parentView.add(childView);
        } else {
            parentView.insertAt({
                view: childView,
                position: atIndex
            });
        }
    }
}