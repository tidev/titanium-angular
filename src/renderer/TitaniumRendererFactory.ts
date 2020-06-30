import {
    Injectable,
    NgZone,
    RendererFactory2,
    RendererType2,
} from '@angular/core';
import { TitaniumElementRegistry } from 'titanium-vdom';

import {
    Logger
} from '../log';
import {
    DeviceEnvironment
} from '../services';
import { TitaniumRenderer } from './TitaniumRenderer'

@Injectable()
export class TitaniumRendererFactory implements RendererFactory2 {

    private titaniumElementRegistry: TitaniumElementRegistry

    private defaultRenderer: TitaniumRenderer;

    private logger: Logger;

    private device: DeviceEnvironment;

    constructor(
        titaniumElementRegistry: TitaniumElementRegistry,
        logger: Logger,
        device: DeviceEnvironment,
        private zone: NgZone
    ) {
        this.titaniumElementRegistry = titaniumElementRegistry;
        const meta = this.titaniumElementRegistry.getViewMetadata('table-view');
        meta.detached = false;
        this.logger = logger;
        this.device = device;
        this.defaultRenderer = new TitaniumRenderer({
            elementRegistry: this.titaniumElementRegistry,
            logger: this.logger,
            device: this.device
        }, zone);
    }

    createRenderer(hostElement: any, type: RendererType2): TitaniumRenderer {
        this.logger.debug(`TitaniumRendererFactory.createRenderer(${hostElement}, ${type})`);
        if (!hostElement || !type) {
            return this.defaultRenderer;
        }
        return new TitaniumRenderer({
            elementRegistry: this.titaniumElementRegistry,
            logger: this.logger,
            device: this.device
        }, this.zone);
    }

}