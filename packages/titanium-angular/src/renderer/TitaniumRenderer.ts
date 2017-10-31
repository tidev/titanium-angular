import {
    Renderer2,
    RendererStyleFlags2
} from '@angular/core'

import {
    CommentNode,
    ElementNode,
    NodeInterface,
    RootNode,
    TitaniumElementNode,
    TitaniumElementRegistry,
    TextNode
} from '../vdom';

export class TitaniumRenderer extends Renderer2 {

    private rootView: RootNode;

    private elementRegistry: TitaniumElementRegistry;

    constructor(rootView: RootNode, elementRegistry: TitaniumElementRegistry) {
        super();

        console.log('TitaniumRenderer created');

        this.rootView = rootView;
        this.elementRegistry = elementRegistry;
    }

    get data(): { [key: string]: any } {
        return Object.create(null);
    }

    destroy(): void {
        console.log('TitaniumRenderer.destroy');
    }

    createElement(name: string, namespace?: string | null): NodeInterface {
        console.log(`TitaniumRenderer.createElement ${name}`);
        if (this.elementRegistry.isTitaniumView(name)) {
            let createView = this.elementRegistry.getViewFactory(name);
            return new TitaniumElementNode(name, createView());
        } else {
            return new ElementNode(name);
        }
    }

    createComment(value: string): CommentNode {
        console.log(`TitaniumRenderer.createComment: ${value}`);
        return new CommentNode(value);
    }

    createText(value: string): TextNode {
        console.log(`TitaniumRenderer.createText: ${value}`);
        return new TextNode(value);
    }

    appendChild(parent: NodeInterface, newChild: NodeInterface): void {
        console.log(`TitaniumRenderer.appendChild ${newChild} to ${parent}`);
        if (!parent) {
            console.log('no parent');
            return;
        }

        parent.appendChild(newChild);
    }

    insertBefore(parent: NodeInterface, newChild: NodeInterface, refChild: any): void {
        console.log('TitaniumRenderer.insertBefore ${newChild} -> ${parent}');
    }

    removeChild(parent: NodeInterface, oldChild: NodeInterface): void {
        console.log('TitaniumRenderer.removeChild ${newChild} -> ${parent}');
    }

    selectRootElement(selectorOrNode: string | any): RootNode {
        console.log(`TitaniumRenderer.selectRootElement ${selectorOrNode}`);
        return this.rootView;
    }

    parentNode(node: any): any {
        console.log('TitaniumRenderer.parentNode');
    }

    nextSibling(node: any): any {
        console.log(`TitaniumRenderer.nextSibling`);
    }

    setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
        console.log(`TitaniumRenderer.setAttribute(${el}, ${name}, ${value})`);
    }

    removeAttribute(el: any, name: string, namespace?: string | null): void {
        console.log(`TitaniumRenderer.removeAttribute`);
    }

    addClass(el: any, name: string): void {
        console.log(`TitaniumRenderer.addClass`);
    }

    removeClass(el: any, name: string): void {
        console.log(`TitaniumRenderer.removeClass`);
    }

    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
        console.log(`TitaniumRenderer.setStyle`);
    }

    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
        console.log(`TitaniumRenderer.removeStyle`);
    }

    setProperty(el: any, name: string, value: any): void {
        console.log(`TitaniumRenderer.setProperty`);
    }

    setValue(node: any, value: string): void {
        console.log(`TitaniumRenderer.setValue`);
    }

    listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void {
        console.log(`TitaniumRenderer.listen`);
        return null;
    }
}