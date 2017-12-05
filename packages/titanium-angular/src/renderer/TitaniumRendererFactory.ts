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

import {
    Logger
} from '../log';

@Injectable()
export class TitaniumRendererFactory implements RendererFactory2 {

    private titaniumElementRegistry: TitaniumElementRegistry

    private defaultRenderer: TitaniumRenderer;

    private logger: Logger;

    constructor(titaniumElementRegistry: TitaniumElementRegistry, logger: Logger) {
        this.titaniumElementRegistry = titaniumElementRegistry;
        this.logger = logger;
        this.defaultRenderer = new TitaniumRenderer(this.titaniumElementRegistry, this.logger);
    }

    createRenderer(hostElement: any, type: RendererType2): TitaniumRenderer {
        this.logger.debug('TitaniumRendererFactory.createRenderer');
        if (!hostElement || !type) {
            return this.defaultRenderer;
        }
        return new TitaniumRenderer(this.titaniumElementRegistry, this.logger);
    }

}