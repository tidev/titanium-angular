import { 
    COMPILER_OPTIONS,
    createPlatformFactory,
    PlatformRef,
    StaticProvider
} from '@angular/core';

import {
    ɵplatformCoreDynamic as platformCoreDynamic
} from '@angular/platform-browser-dynamic';

import {
    TitaniumPlatformRef
} from '.';

import {
    COMMON_PROVIDERS,
    TITANIUM_COMPILER_PROVIDERS
} from './providers';

export const _platformTitaniumDynamic = createPlatformFactory(
    platformCoreDynamic,
    'titaniumDynamic',
    [...COMMON_PROVIDERS, ...TITANIUM_COMPILER_PROVIDERS]
);

export function platformTitaniumDynamic(extraProviders?: any[]) {
    return new TitaniumPlatformRef(_platformTitaniumDynamic(extraProviders));
}