import {
    ApplicationRef,
    Attribute,
    ChangeDetectorRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    Injector,
    OnInit,
    OnDestroy,
    Output,
    ViewContainerRef
} from '@angular/core';
import {
    ActivatedRoute,
    ChildrenOutletContexts,
    PRIMARY_OUTLET
} from '@angular/router';
import { NavigationManager } from 'titanium-navigator';

import { DetachedLoaderComponent } from '../../common';
import { Logger } from '../../log';
import { TitaniumRouter } from '../TitaniumRouter';

@Directive({
    selector: 'ti-router-outlet'
})
export class TitaniumRouterOutletDirective implements OnInit, OnDestroy {
    private activated: ComponentRef<any> | null = null;
    private _activatedRoute: ActivatedRoute | null = null;
    private name: string;
    private detachedLoaderFactory: ComponentFactory<DetachedLoaderComponent>;
    private isInitialRoute = true;

    @Output('activate') activateEvents = new EventEmitter<any>();
    @Output('deactivate') deactivateEvents = new EventEmitter<any>();

    constructor(
            private parentContexts: ChildrenOutletContexts,
            private location: ViewContainerRef,
            private resolver: ComponentFactoryResolver,
            @Attribute('name') name: string,
            private changeDetector: ChangeDetectorRef,
            private logger: Logger,
            private navigationManager: NavigationManager,
            router: TitaniumRouter) {
        this.name = name || PRIMARY_OUTLET;
        parentContexts.onChildOutletCreated(this.name, <any>this);
        this.detachedLoaderFactory = resolver.resolveComponentFactory(DetachedLoaderComponent);

        this.navigationManager.nativeBackNavigationSignal.subscribe(() => {
            router.back();
        })
    }

    get isActivated(): boolean {
        return !!this.activated;
    }

    get component(): Object {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }

        return this.activated.instance;
    }

    get activatedRoute(): ActivatedRoute {
        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }

        return this._activatedRoute as ActivatedRoute;
    }

    get activatedRouteData() {
        if (this._activatedRoute) {
            return this._activatedRoute.snapshot.data;
        }

        return {};
    }

    /**
     * Initializes the router outlet directive.
     *
     * If the outlet was not instantiated at the time the route got activated
     * we need to populate the outlet when it is initialized (ie inside a NgIf).
     * The context's `attachRef` is populated when there is an existing
     * component to mount, otherwise the component defined in the configuration
     * is created.
     */
    ngOnInit(): void {
        this.logger.trace('TitaniumRouterOutlet.ngOnInit');
        if (this.isActivated) {
            return;
        }

        const context = this.parentContexts.getContext(this.name);
        if (context && context.route) {
            if (context.attachRef) {
                this.attach(context.attachRef, context.route);
            } else {
                this.activateWith(context.route, context.resolver || null);
            }
        }
    }

    ngOnDestroy(): void {
        this.logger.trace('TitaniumRouterOutlet.ngOnDestroy');
        this.parentContexts.onChildOutletDestroyed(this.name);
    }

    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        this.logger.trace(`TitaniumRouterOutlet.activateWith - ${activatedRoute.pathFromRoot.join(' -> ')}`);

        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }

        this._activatedRoute = activatedRoute;

        const snapshot = activatedRoute.snapshot;
        const component = <any>snapshot.routeConfig!.component;
        resolver = resolver || this.resolver;
        this.logger.debug(`Resolving component factory for ${component.name}`);
        const factory = resolver.resolveComponentFactory(component);
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
        const loaderRef = this.location.createComponent(this.detachedLoaderFactory, this.location.length, injector);
        this.activated = loaderRef.instance.loadWithFactory(factory);

        if (this.isInitialRoute) {
            // this.activated = this.location.createComponent(factory, this.location.length, injector);
            this.changeDetector.markForCheck();
            this.navigationManager.createAndOpenRootNavigator(this.activated);
            this.isInitialRoute = false;
        } else {
            // const loaderRef = this.location.createComponent(this.detachedLoaderFactory, this.location.length, injector);
            // this.activated = loaderRef.instance.loadWithFactory(factory);
            this.changeDetector.markForCheck();
            this.navigationManager.open(this.activated);
        }

        this.activateEvents.emit(this.component);
    }

    deactivate(): void {
        this.logger.trace('TitaniumRouterOutlet.deactivate');

        if (!this.activated) {
            return;
        }

        const componentInstance = this.component;
        this.activated.destroy();
        this.activated = null;
        this._activatedRoute = null;
        this.deactivateEvents.emit(componentInstance);
    }

    /**
     * Reattaches a route.
     *
     * The order in which the back navigation flags are checked is important here.
     * When a back navigation was triggeered by a native event, such as the back
     * button in the iOS navigation bar or the hardware back button on Android,
     * both flags are set to true. This is because the navigators internally
     * use the Location.back() method to sync router states. This also sets the
     * isLocationBackNavigation to true. But only when it was set without a
     * natively triggered back navigation, the NavigationManager.back() method
     * has to be called.
     *
     * @param ref
     * @param activedRoute
     */
    attach(ref: ComponentRef<any>, activedRoute: ActivatedRoute) {
        this.logger.trace('TitaniumRouterOutlet.attach');

        this.activated = ref;
        this._activatedRoute = activedRoute;

        if (this.navigationManager.isNativeBackNavigation) {
            this.navigationManager.resetBackNavigationFlags();
        } else if (this.navigationManager.isLocationBackNavigation) {
            this.navigationManager.back();
            this.navigationManager.resetBackNavigationFlags();
        }
    }

    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach(): ComponentRef<any> {
        this.logger.trace('TitaniumRouterOutlet.detach');

        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }

        const componentRef = this.activated;
        this.activated = null;
        this._activatedRoute = null;

        return componentRef;
    }
}

class OutletInjector implements Injector {
    constructor(private route: ActivatedRoute, private childContexts: ChildrenOutletContexts, private parent: Injector) {

    }

    get(token: any, notFoundValue?: any): any {
        if (token === ActivatedRoute) {
            return this.route;
        }

        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }

        return this.parent.get(token, notFoundValue);
    }
}