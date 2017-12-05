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
    TitaniumRendererFactory
} from './renderer';

import {
    TitaniumElementRegistry
} from './vdom';

import {
    Logger
} from './log'

class MyErrorHandler extends ErrorHandler {

    private logger: Logger;

    constructor(logger: Logger) {
        super();
        this.logger = logger;
    }

    handleError(error: any): void {
        this.logger.error(error.message);
        this.logger.error(error.stack);
    }
}

@NgModule({
    providers: [
        SystemJsNgModuleLoader,
        { provide: ErrorHandler, useClass: MyErrorHandler, deps: [Logger] },
        { provide: TitaniumRendererFactory, useClass: TitaniumRendererFactory, deps: [TitaniumElementRegistry, Logger] },
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