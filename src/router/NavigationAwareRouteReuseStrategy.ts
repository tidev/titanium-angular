import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";
import { NavigationManager } from "titanium-navigator";

import { Logger } from '../log';

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
        if (this.navigationManager.isNativeBackNavigation || this.navigationManager.isLocationBackNavigation) {
            return false;
        }

        return true;
    }

    /**
     * Stores the detached route.
     *
     * Storing a `null` value should erase the previously stored value.
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        this.logger.debug(this.getRouteDebugDescription(route));

        const absoluteRoutePath = this.generateAbsoluteRoutePath(route);
        if (!handle) {
            this.handlers.delete(absoluteRoutePath);
        } else {
            this.handlers.set(absoluteRoutePath, handle);
        }
    }

    /**
     * Determines if this route (and its subtree) should be reattached
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        this.logger.trace(this.getRouteDebugDescription(route));

        // check if we are coming from a natively triggered back navigation
        if (this.navigationManager.isNativeBackNavigation) {
            return true;
        } else if (this.navigationManager.isLocationBackNavigation) {
            return true;
        }

        return false;
    }

    /**
     * Retrieves the previously stored route
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const absoluteRoutePath = this.generateAbsoluteRoutePath(route);
        if (this.handlers.has(absoluteRoutePath)) {
            return this.handlers.get(absoluteRoutePath);
        }

        return null;
    }

    /**
     * Determines if a route should be reused.
     *
     * Reuses routes as long as their route config is the same.
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    clearDetachedRouteHandlers(): void {
        this.handlers.clear();
    }

    snapshotDetachedRoutehandlers(): Map<string, DetachedRouteHandle> {
        return new Map(this.handlers);
    }

    restoreHandlers(handlers: Map<string, DetachedRouteHandle>): void {
        this.handlers = new Map(handlers);
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