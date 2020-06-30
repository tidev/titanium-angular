import { LocationStrategy, PlatformLocation } from '@angular/common';
import {
    Injector,
    ModuleWithProviders,
    NgModule,
    NO_ERRORS_SCHEMA,
    Provider
} from '@angular/core';
import { ExtraOptions, RouteReuseStrategy, RouterModule, Routes, Router } from '@angular/router';
import { loadNavigatorProviders, NavigationManager } from 'titanium-navigator';

import { HistoryStack, TitaniumPlatformLocation, EmulatedPathLocationStrategy } from '../common';
import { Logger } from '../log';
import { TitaniumCommonModule } from '../TitaniumCommonModule';
import { TitaniumRouterLinkDirective, TitaniumRouterOutletDirective } from './directives';
import { TitaniumRouter } from './TitaniumRouter';
import { NavigationAwareRouteReuseStrategy } from './NavigationAwareRouteReuseStrategy';
import { EmptyOutletComponent } from './components/EmptyOutlet';
import { ComponentAdapter } from './adapters/ComponentAdapter';
import { RouterStateAdapter } from './adapters/RouterStateAdapter';

export function createNavigationManager(injector: Injector) {
    return new NavigationManager({
        componentAdapter: new ComponentAdapter(),
        navigatorProviders: loadNavigatorProviders(tabGroup => new RouterStateAdapter(tabGroup, injector))
    });
}

const ROUTER_DIRECTIVES = [
    TitaniumRouterLinkDirective,
    TitaniumRouterOutletDirective,
    EmptyOutletComponent
];

export const ROUTER_PROVIDERS: Provider[] = [
    { provide: NavigationManager, useFactory: createNavigationManager, deps: [Injector] },
    HistoryStack,
    { provide: TitaniumPlatformLocation, useClass: TitaniumPlatformLocation, deps: [HistoryStack, NavigationManager] },
    { provide: PlatformLocation, useExisting: TitaniumPlatformLocation },
    { provide: EmulatedPathLocationStrategy, useClass: EmulatedPathLocationStrategy, deps: [PlatformLocation] },
    { provide: LocationStrategy, useExisting: EmulatedPathLocationStrategy },
    { provide: NavigationAwareRouteReuseStrategy, useClass: NavigationAwareRouteReuseStrategy, deps: [NavigationManager, Logger] },
    { provide: RouteReuseStrategy, useExisting: NavigationAwareRouteReuseStrategy },
    TitaniumRouter
];

// @dynamic
@NgModule({
    declarations: ROUTER_DIRECTIVES,
    imports: [
        RouterModule,
        TitaniumCommonModule,
    ],
    exports: [
        RouterModule,
        ...ROUTER_DIRECTIVES
    ],
    entryComponents: [EmptyOutletComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TitaniumRouterModule {
    static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders<TitaniumRouterModule> {
        return {
            ngModule: TitaniumRouterModule,
            providers: [...RouterModule.forRoot(routes, config).providers, ...ROUTER_PROVIDERS]
        }
    }

    static forChild(routes: Routes): ModuleWithProviders<TitaniumRouterModule> {
        return {
            ngModule: TitaniumRouterModule,
            providers: RouterModule.forChild(routes).providers
        }
    }
}
