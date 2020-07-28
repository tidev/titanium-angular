import { createPlatformFactory, PlatformRef } from '@angular/core';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';

import { TitaniumPlatformRef } from '../core/TitaniumPlatformRef';
import { COMMON_PROVIDERS, TITANIUM_COMPILER_PROVIDERS } from './providers';

export const _platformTitaniumDynamic = createPlatformFactory(
    platformCoreDynamic,
    'titaniumDynamic',
    [...COMMON_PROVIDERS, ...TITANIUM_COMPILER_PROVIDERS]
);

export function platformTitaniumDynamic(): PlatformRef {
    return new TitaniumPlatformRef(_platformTitaniumDynamic());
}