import { PlatformLocation } from '@angular/common';

import {
    ElementSchemaRegistry,
    ResourceLoader
} from '@angular/compiler';

import { 
    COMPILER_OPTIONS,
    InjectionToken,
    MissingTranslationStrategy,
    PLATFORM_INITIALIZER,
    Sanitizer,
    StaticProvider,
    ViewEncapsulation
} from '@angular/core';

import {
    HistoryStack,
    TitaniumPlatformLocation,
} from '../common';

import {
    FileSystemResourceLoader,
    TitaniumElementSchemaRegistry
} from '../compiler';

import {
    Logger
} from '../log';

import {
    DeviceEnvironment
} from '../services';

import {
    TitaniumDomAdapter,
    TitaniumElementRegistry
} from '../vdom';

import { TitaniumSanitizer } from './TitaniumSanitizer';

export function initDomAdapter() {
    TitaniumDomAdapter.makeCurrent();
}

export const COMMON_PROVIDERS = [
    { provide: Logger, useClass: Logger, deps: [] },
    { provide: DeviceEnvironment, useClass: DeviceEnvironment, deps: [] },
    { provide: TitaniumElementRegistry, useClass: TitaniumElementRegistry, deps: [Logger]},
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: HistoryStack, useClass: HistoryStack, deps: [] },
    { provide: PlatformLocation, useClass: TitaniumPlatformLocation, deps: [HistoryStack] },
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