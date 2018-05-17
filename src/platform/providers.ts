import { Location, PlatformLocation } from '@angular/common';
import { ElementSchemaRegistry, ResourceLoader } from '@angular/compiler';
import { 
    COMPILER_OPTIONS,
    InjectionToken,
    Injector,
    MissingTranslationStrategy,
    PLATFORM_INITIALIZER,
    Sanitizer,
    StaticProvider,
    ViewEncapsulation
} from '@angular/core';

import { NavigationTransitionHandler, TransitionRegistry } from '../animation';
import { TitaniumSanitizer } from '../core/TitaniumSanitizer';
import { FileSystemResourceLoader, TitaniumElementSchemaRegistry } from '../compiler';
import { Logger } from '../log';
import { NavigationManager } from '../router/NavigationManager';
import { DeviceEnvironment } from '../services';
import { TitaniumDomAdapter, TitaniumElementRegistry } from '../vdom';

export function initDomAdapter() {
    TitaniumDomAdapter.makeCurrent();
}

export const COMMON_PROVIDERS = [
    { provide: Logger, useClass: Logger, deps: [] },
    { provide: DeviceEnvironment, useClass: DeviceEnvironment, deps: [] },
    { provide: TransitionRegistry, useClass: TransitionRegistry, deps: [DeviceEnvironment] },
    { provide: NavigationTransitionHandler, useClass: NavigationTransitionHandler, deps: [TransitionRegistry] },
    { provide: TitaniumElementRegistry, useClass: TitaniumElementRegistry, deps: [Logger]},
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