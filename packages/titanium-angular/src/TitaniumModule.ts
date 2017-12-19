// Explicitly require this early, otherwise Angular DI doens't work properly
import 'reflect-metadata';
import 'zone.js';

import {
    ApplicationModule,
    ErrorHandler,
    NO_ERRORS_SCHEMA,
    NgModule,
    RendererFactory2,
    SystemJsNgModuleLoader,
} from '@angular/core';

import {
    Logger
} from './log'

import { 
    TitaniumRendererFactory
} from './renderer';

import {
    DeviceEnvironment
} from './services';

import {
    TitaniumElementRegistry
} from './vdom';

import {
    TitaniumCommonModule
} from './TitaniumCommonModule';

import {
    TitaniumErrorHandler
} from './TitaniumErrorHandler';

@NgModule({
    providers: [
        SystemJsNgModuleLoader,
        { provide: ErrorHandler, useClass: TitaniumErrorHandler, deps: [Logger] },
        { provide: TitaniumRendererFactory, useClass: TitaniumRendererFactory, deps: [TitaniumElementRegistry, Logger, DeviceEnvironment] },
        { provide: RendererFactory2, useExisting: TitaniumRendererFactory }
    ],
    imports: [
        ApplicationModule,
        TitaniumCommonModule
    ],
    exports: [
        ApplicationModule,
        TitaniumCommonModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TitaniumModule {
}