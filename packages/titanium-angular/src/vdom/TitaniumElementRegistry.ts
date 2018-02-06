import {
    Inject,
    Injectable,
    InjectionToken
} from '@angular/core';

import {
    Logger
} from '../log'

import { ProxyFactory, ViewMetadata } from './elements/TitaniumElement';

export interface TitaniumViewElementMeta {
    resolveFactory: Function
    meta: ViewMetadata
}

@Injectable()
export class TitaniumElementRegistry {
    private logger: Logger;

    private elements: Map<any, TitaniumViewElementMeta>;

    constructor(@Inject(Logger) logger: Logger) {
        this.logger = logger;
        this.elements = new Map();
    }

    registerElement(tagName: string, resolveFactory: () => ProxyFactory, meta: ViewMetadata): void {
        this.logger.trace(`Registering Titanium view <${tagName}> (meta: ${JSON.stringify(meta)})`);
        this.elements.set(tagName.toLowerCase(), {
            resolveFactory,
            meta
        });
    }

    hasElement(tagName: string): boolean {
        return this.elements.has(tagName.toLowerCase());
    }

    getViewFactory(tagName): ProxyFactory {
        if (!this.hasElement(tagName)) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName.toLowerCase()).resolveFactory();
    }

    getViewMetadata(tagName): ViewMetadata {
        if (!this.hasElement(tagName)) {
            throw new Error(`No titanium view registerd for tag ${tagName}`);
        }

        return this.elements.get(tagName.toLowerCase()).meta;
    }
}