import {
    ElementSchemaRegistry,
    ResourceLoader
} from '@angular/compiler';

import { 
    COMPILER_OPTIONS,
    InjectionToken,
    MissingTranslationStrategy,
    Sanitizer,
    StaticProvider,
    ViewEncapsulation
} from '@angular/core';

import {
    FileSystemResourceLoader,
    TitaniumElementSchemaRegistry
} from '../compiler';

import {
    ELEMENT_REGISTRY,
    TitaniumElementRegistry
} from '../vdom';

import { TitaniumSanitizer } from './TitaniumSanitizer';

export const COMMON_PROVIDERS = [
    { provide: TitaniumElementRegistry, useClass: TitaniumElementRegistry, deps: []},
    { provide: ELEMENT_REGISTRY, useExisting: TitaniumElementRegistry},
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