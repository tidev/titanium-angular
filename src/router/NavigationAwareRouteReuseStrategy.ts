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
        this.logger.trace('NavigationAwareRouteReuseStrategy.shouldDetach');
        this.logger.trace(route.pathFromRoot.join(' -> '));

        if (this.navigationManager.isNativeBackNavigation || this.navigationManager.isLocationBackNavigation) {
            this.logger.trace('Back navigation detected, NOT detaching route');
            return false;
        }

        this.logger.trace('Forward navigation, detaching route.');

        return true;
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
        this.logger.trace('NavigationAwareRouteReuseStrategy.shouldAttach');
        this.logger.trace(this.getRouteDebugDescription(route));

        // check if we are coming from a natively triggered back navigation
        if (this.navigationManager.isNativeBackNavigation) {
            this.logger.trace('Natively triggered back navigation in progress, should reattach route.');
            return true;
        } else if (this.navigationManager.isLocationBackNavigation) {
            this.logger.trace('Back navigation triggered from platform location, should reattach route.');
            return true;
        }

        this.logger.trace('Returning false from shouldAttach');

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