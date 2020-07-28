import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras, UrlTree } from '@angular/router';
import { NavigationManager } from 'titanium-navigator';

import { NavigationOptions } from './NavigationOptions';

export type TitaniumNavigationOptions = NavigationOptions & NavigationExtras;

/**
 * A proxy around the Angular router to inject navigation options into our
 * navigation manager before delegating back to the original router.
 */
@Injectable()
export class TitaniumRouter {

    private router: Router;

    private navigationManager: NavigationManager;

    private location: Location;

    constructor(router: Router, navigationManager: NavigationManager, location: Location) {
        this.router = router;
        this.navigationManager = navigationManager;
        this.location = location;
    }

    public navigate(commands: any[], options?: TitaniumNavigationOptions): Promise<boolean> {
        if (options) {
            this.navigationManager.currentNavigationOptions = options;
        }
        return this.router.navigate(commands, options);
    }

    public navigateByUrl(url: string | UrlTree, options?: TitaniumNavigationOptions): Promise<boolean> {
        if (options) {
            this.navigationManager.currentNavigationOptions = options;
        }
        return this.router.navigateByUrl(url, options);
    }

    public back() {
        this.location.back();
    }

}