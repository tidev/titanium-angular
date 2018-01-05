import {
    PlatformLocation
} from '@angular/common';

import {
    ModuleWithProviders,
    NgModule,
    NO_ERRORS_SCHEMA,
    Provider
} from '@angular/core';

import {
    ExtraOptions,
    RouterModule,
    Routes
} from '@angular/router';

import {
    TitaniumRouterLinkDirective,
    TitaniumRouterOutletDirective
} from './directives';

import { TitaniumCommonModule } from '../TitaniumCommonModule';

const ROUTER_DIRECTIVES = [
    TitaniumRouterLinkDirective,
    TitaniumRouterOutletDirective
];

const ROUTER_PROVIDERS: Provider[] = [

];

@NgModule({
    providers: [
        ...ROUTER_PROVIDERS
    ],
    declarations: [
        ...ROUTER_DIRECTIVES
    ],
    imports: [
        RouterModule,
        TitaniumCommonModule,
    ],
    exports: [
        RouterModule,
        ...ROUTER_DIRECTIVES
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TitaniumRouterModule {
    static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders {
        return RouterModule.forRoot(routes, config);
    }

    static forChild(routes: Routes): ModuleWithProviders {
        return RouterModule.forChild(routes);
    }
}