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
    ViewportScroller,
    ɵNullViewportScroller as NullViewportScroller,
} from "@angular/common";
import { TitaniumElementRegistry } from 'titanium-vdom';

import { DetachedLoaderComponent } from './common';
import { TitaniumRendererFactory } from './renderer';
import { TitaniumCommonModule } from './TitaniumCommonModule';

export function errorHandler() {
    return new ErrorHandler();
}

@NgModule({
    declarations: [
        DetachedLoaderComponent
    ],
    providers: [
        SystemJsNgModuleLoader,
        { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
        TitaniumRendererFactory,
        { provide: RendererFactory2, useExisting: TitaniumRendererFactory },
        { provide: ViewportScroller, useClass: NullViewportScroller },
    ],
    entryComponents: [
        DetachedLoaderComponent
    ],
    imports: [
        ApplicationModule,
        TitaniumCommonModule
    ],
    exports: [
        ApplicationModule,
        TitaniumCommonModule,
        DetachedLoaderComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TitaniumModule {
}