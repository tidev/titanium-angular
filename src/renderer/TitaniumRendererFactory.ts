import {
    Injectable,
    NgZone,
    RendererFactory2,
    RendererType2,
} from '@angular/core';
import { TitaniumElementRegistry } from 'titanium-vdom';

import { Logger } from '../log';
import { TitaniumRenderer } from './TitaniumRenderer'

@Injectable()
export class TitaniumRendererFactory implements RendererFactory2 {

    private titaniumElementRegistry: TitaniumElementRegistry

    private defaultRenderer: TitaniumRenderer;

    private logger: Logger;

    constructor(
        titaniumElementRegistry: TitaniumElementRegistry,
        logger: Logger,
        private zone: NgZone
    ) {
        this.titaniumElementRegistry = titaniumElementRegistry;
        const meta = this.titaniumElementRegistry.getViewMetadata('table-view');
        meta.detached = false;
        this.logger = logger;
        this.defaultRenderer = new TitaniumRenderer({
            elementRegistry: this.titaniumElementRegistry,
            logger: this.logger,
        }, zone);
    }

    createRenderer(hostElement: any, type: RendererType2): TitaniumRenderer {
        if (!hostElement || !type) {
            return this.defaultRenderer;
        }
        return new TitaniumRenderer({
            elementRegistry: this.titaniumElementRegistry,
            logger: this.logger,
        }, this.zone);
    }

}