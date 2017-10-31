import {
    ApplicationModule,
    ErrorHandler,
    NO_ERRORS_SCHEMA,
    NgModule,
    RendererFactory2,
    SystemJsNgModuleLoader,
} from '@angular/core';

import { 
    RootViewService,
    TitaniumRendererFactory
} from './renderer';

import {
    TitaniumElementRegistry
} from './vdom';

export function errorHandlerFactory() {
    return new ErrorHandler();
}

@NgModule({
    providers: [
        { provide: TitaniumRendererFactory, useClass: TitaniumRendererFactory, deps: [RootViewService, TitaniumElementRegistry]},
        SystemJsNgModuleLoader,
        { provide: ErrorHandler, useFactory: errorHandlerFactory },
        { provide: RendererFactory2, useExisting: TitaniumRendererFactory },
    ],
    imports: [
        ApplicationModule
    ],
    exports: [
        ApplicationModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TitaniumModule {
}