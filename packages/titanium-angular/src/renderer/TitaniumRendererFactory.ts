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
    Logger
} from '../log';

import {
    DeviceEnvironment
} from '../services';

import {
    TitaniumElementRegistry
} from '../vdom';

@Injectable()
export class TitaniumRendererFactory implements RendererFactory2 {

    private titaniumElementRegistry: TitaniumElementRegistry

    private defaultRenderer: TitaniumRenderer;

    private logger: Logger;

    private device: DeviceEnvironment;

    constructor(titaniumElementRegistry: TitaniumElementRegistry, logger: Logger, device: DeviceEnvironment) {
        this.titaniumElementRegistry = titaniumElementRegistry;
        this.logger = logger;
        this.device = device;
        this.defaultRenderer = new TitaniumRenderer(this.titaniumElementRegistry, this.logger, this.device);
    }

    createRenderer(hostElement: any, type: RendererType2): TitaniumRenderer {
        this.logger.debug('TitaniumRendererFactory.createRenderer');
        if (!hostElement || !type) {
            return this.defaultRenderer;
        }
        return new TitaniumRenderer(this.titaniumElementRegistry, this.logger, this.device);
    }

}