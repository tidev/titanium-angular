import {
    createPlatformFactory,
    platformCore,
    PlatformRef,
    StaticProvider
} from "@angular/core";

import { TitaniumPlatformRef } from '../core/TitaniumPlatformRef';
import { COMMON_PROVIDERS } from './providers';

export const _platformTitanium = createPlatformFactory(
    platformCore,
    'titanium',
    [...COMMON_PROVIDERS]
);

export function platformTitanium(): PlatformRef {
    return new TitaniumPlatformRef(_platformTitanium());
}