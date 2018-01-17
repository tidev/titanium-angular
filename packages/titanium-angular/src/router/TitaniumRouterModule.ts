import { LocationStrategy, PlatformLocation } from '@angular/common';
import {
    FactoryProvider,
    ModuleWithProviders,
    NgModule,
    NO_ERRORS_SCHEMA,
    Provider
} from '@angular/core';
import { ExtraOptions, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { EmulatedPathLocationStrategy } from '../common';
import { Logger } from '../log';
import { TitaniumCommonModule } from '../TitaniumCommonModule';
import { TitaniumRouterLinkDirective, TitaniumRouterOutletDirective } from './directives';
import { NavigationManager } from './NavigationManager';
import { TitaniumRouter } from './TitaniumRouter';
import { TabGroupNavigator } from './navigators/TabGroupNavigator';
import { WindowNavigator } from './navigators/WindowNavigator';
import { NavigationAwareRouteReuseStrategy } from './NavigationAwareRouteReuseStrategy';

const ROUTER_DIRECTIVES = [
    TitaniumRouterLinkDirective,
    TitaniumRouterOutletDirective
];

const ROUTER_PROVIDERS: Provider[] = [
    { provide: EmulatedPathLocationStrategy, useClass: EmulatedPathLocationStrategy, deps: [PlatformLocation] },
    { provide: LocationStrategy, useExisting: EmulatedPathLocationStrategy },
    NavigationManager,
    { provide: NavigationAwareRouteReuseStrategy, useClass: NavigationAwareRouteReuseStrategy, deps: [NavigationManager, Logger] },
    { provide: RouteReuseStrategy, useExisting: NavigationAwareRouteReuseStrategy },
    TitaniumRouter
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
        return removeDefaultLocationStrategy(RouterModule.forRoot(routes, config));
    }

    static forChild(routes: Routes): ModuleWithProviders {
        return removeDefaultLocationStrategy(RouterModule.forChild(routes));
    }
}

/**
 * Removes the default LocationStrategy provider from the list of providers.
 * 
 * By default the Angular router either uses a hash or path strategy which is
 * not compatible with the Titanium platform. We loop through the list of
 * providers and remove it so it won't override our previously defined
 * location strategy in our own TitaniumRouterModule.
 * 
 * @param moduleWithProviders Router module with providers
 */
export function removeDefaultLocationStrategy(moduleWithProviders: ModuleWithProviders): ModuleWithProviders {
    const scrubbedProviders = moduleWithProviders.providers.slice();
    for (let i = 0; i < moduleWithProviders.providers.length; i++) {
        const provider = moduleWithProviders.providers[i];
        if (isLocationStrategyProvider(provider)) {
            scrubbedProviders.splice(i, 1);
            break;
        }
    }
    moduleWithProviders.providers = scrubbedProviders;

    return moduleWithProviders
}

/**
 * Checks if the specified provider is the LocationStrategy provider.
 * 
 * @param provider A provider from the router module's list of providers
 */
function isLocationStrategyProvider(provider: Provider): provider is FactoryProvider {
    return (<FactoryProvider>provider).provide === LocationStrategy;
}