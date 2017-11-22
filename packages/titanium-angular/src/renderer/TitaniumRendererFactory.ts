import {
    Inject,
    Injectable,
    Optional,
    NgZone,
    RendererFactory2,
    RendererType2,
    ViewEncapsulation,
} from '@angular/core';

import {
    TitaniumRenderer
} from '.';

import {
    TitaniumElementRegistry
} from '../vdom';

@Injectable()
export class TitaniumRendererFactory implements RendererFactory2 {

    private titaniumElementRegistry: TitaniumElementRegistry

    private defaultRenderer: TitaniumRenderer;

    constructor(titaniumElementRegistry: TitaniumElementRegistry) {
        this.titaniumElementRegistry = titaniumElementRegistry;
        this.defaultRenderer = new TitaniumRenderer(this.titaniumElementRegistry);
    }

    createRenderer(hostElement: any, type: RendererType2): TitaniumRenderer {
        console.log('TitaniumRendererFactory.createRenderer');
        console.log(hostElement, type);
        if (!hostElement || !type) {
            return this.defaultRenderer;
        }
        return new TitaniumRenderer(this.titaniumElementRegistry);
    }

}