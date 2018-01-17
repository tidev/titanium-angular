import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

import { Logger } from '../log';
import { NavigationManager } from "./NavigationManager";

/**
 * A route reuse strategy that is aware of native navigation events and 
 */
export class NavigationAwareRouteReuseStrategy extends RouteReuseStrategy {

    private navigationManager: NavigationManager;

    private logger: Logger;

    private handlers: Map<string, DetachedRouteHandle> = new Map();

    constructor(navigationManager: NavigationManager, logger: Logger) {
        super();

        this.navigationManager = navigationManager;
        this.logger = logger;
    }

    /** 
     * Determines if this route (and its subtree) should be detached to be reused later
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('NavigationAwareRouteReuseStrategy.shouldDetach');
        console.log(route.pathFromRoot.join(' -> '));

        if (!this.navigationManager.isNativeBackNavigation) {
            this.logger.trace('Not in native back navigation, detaching route');
            return true;
        }

        return false;
    }

    /**
     * Stores the detached route.
     *
     * Storing a `null` value should erase the previously stored value.
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        this.logger.trace('NavigationAwareRouteReuseStrategy.store');
        this.logger.debug(`Start: Stored keys:\n${Array.from(this.handlers.keys()).join('\n')}`);
        this.logger.debug(this.getRouteDebugDescription(route));

        const absoluteRoutePath = this.generateAbsoluteRoutePath(route);
        this.logger.debug(`absolutePath: ${absoluteRoutePath}`);
        if (!handle) {
            this.logger.trace('Trying to store null value, deleting detached route handle');
            this.handlers.delete(absoluteRoutePath);
        } else {
            this.logger.trace(`Storing detached route handle for ${absoluteRoutePath}`);
            this.handlers.set(absoluteRoutePath, handle);
        }

        this.logger.debug(`End: Stored keys:\n${Array.from(this.handlers.keys()).join('\n')}`);
    }

    /**
     * Determines if this route (and its subtree) should be reattached
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('NavigationAwareRouteReuseStrategy.shouldAttach');
        console.log(this.getRouteDebugDescription(route));

        // check if we are coming from a natively triggered back navigation
        if (this.navigationManager.isNativeBackNavigation) {
            this.logger.trace('Natively triggered back navigation in progress, should reattach route.');
            return true;
        }

        return false;
    }

    /**
     * Retrieves the previously stored route
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        this.logger.trace(`NavigationAwareRouteReuseStrategy.retrieve()`);
        this.logger.debug(`Stored keys:\n${Array.from(this.handlers.keys()).join('\n')}`);
        this.logger.debug(`Route: ${this.getRouteDebugDescription(route)}`);

        const absoluteRoutePath = this.generateAbsoluteRoutePath(route);
        this.logger.debug(`absolutePath: ${absoluteRoutePath}`);
        if (this.handlers.has(absoluteRoutePath)) {
            this.logger.trace(`Returning detached route for ${absoluteRoutePath}`);
            return this.handlers.get(absoluteRoutePath);
        }

        this.logger.warn('Returning null from retrieve!');

        return null;
    }

    /**
     * Determines if a route should be reused
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log('NavigationAwareRouteReuseStrategy.shouldReuseRoute');
        console.log(`future: ${this.getRouteDebugDescription(future)}`);
        console.log(`curr: ${this.getRouteDebugDescription(curr)}`);

        return future.routeConfig === curr.routeConfig;
    }

    private generateAbsoluteRoutePath(route: ActivatedRouteSnapshot): string {
        let urlSegments = [];
        urlSegments = urlSegments.concat(route.url);
        let parentRoute = route.parent;
        while(parentRoute) {
            urlSegments = urlSegments.concat(parentRoute.url);
            parentRoute = parentRoute.parent;
        }
        
        return urlSegments.reverse().join('/');
    }

    private getRouteDebugDescription(route: ActivatedRouteSnapshot) {
        return route.pathFromRoot.join(' -> ');
    }
}