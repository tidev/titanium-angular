import { ElementSchemaRegistry, ResourceLoader } from '@angular/compiler';
import {
    COMPILER_OPTIONS,
    PLATFORM_INITIALIZER,
    Sanitizer,
} from '@angular/core';
import { registerTitaniumElements, TitaniumElementRegistry } from 'titanium-vdom';

import { TitaniumSanitizer } from '../core/TitaniumSanitizer';
import { FileSystemResourceLoader, TitaniumElementSchemaRegistry } from '../compiler';
import { Logger } from '../log';
import { DeviceEnvironment } from '../services';
import { TitaniumDomAdapter } from './TitaniumDomAdapter'

export function initDomAdapter() {
    TitaniumDomAdapter.makeCurrent();
}

export function createElementRegistry(): TitaniumElementRegistry {
    const registry = TitaniumElementRegistry.getInstance();
    registry.defaultViewMetadata = {
        detached: false
    };
    registerTitaniumElements(registry);
    return registry;
}

export const COMMON_PROVIDERS = [
    { provide: Logger, useClass: Logger, deps: [] },
    { provide: DeviceEnvironment, useClass: DeviceEnvironment, deps: [] },
    { provide: TitaniumElementRegistry, useFactory: createElementRegistry, deps: []},
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: Sanitizer, useClass: TitaniumSanitizer, deps: [] }
];

export const TITANIUM_COMPILER_PROVIDERS = [
    {
        provide: COMPILER_OPTIONS,
        useValue: {
            providers: [
                { provide: ResourceLoader, useClass: FileSystemResourceLoader, deps: [] },
                { provide: ElementSchemaRegistry, useClass: TitaniumElementSchemaRegistry, deps: [] },
            ]
        },
        multi: true
    },
];