import {
    Injectable,
    InjectionToken
} from '@angular/core';

import {
    ViewMetadata
} from '.';

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
        this.elements.set(tagName.toLowerCase(), {
            resolveFactory,
            meta
        });
    }

    isTitaniumView(tagName: string): boolean {
        return this.elements.has(tagName.toLowerCase());
    }

    getViewFactory(tagName): Function {
        if (!this.isTitaniumView(tagName)) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName.toLowerCase()).resolveFactory();
    }

    getViewMetadata(tagName): ViewMetadata {
        if (!this.isTitaniumView(tagName)) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName.toLowerCase()).meta;
    }
}