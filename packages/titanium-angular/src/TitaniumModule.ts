import {
    ApplicationModule,
    ErrorHandler,
    NO_ERRORS_SCHEMA,
    NgModule,
    RendererFactory2,
    SystemJsNgModuleLoader,
} from '@angular/core';

import {
    TitaniumCommonModule
} from './TitaniumCommonModule';

import { 
    RootViewService,
    TitaniumRendererFactory
} from './renderer';

import {
    TitaniumElementRegistry
} from './vdom';

class MyErrorHandler extends ErrorHandler {
    handleError(error: any): void {
        console.error(error.message);
        console.error(error.stack);
    }
}

@NgModule({
    providers: [
        SystemJsNgModuleLoader,
        { provide: ErrorHandler, useClass: MyErrorHandler },
        { provide: TitaniumRendererFactory, useClass: TitaniumRendererFactory, deps: [RootViewService, TitaniumElementRegistry] },
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