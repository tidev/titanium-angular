import {
    Attribute,
    ChangeDetectorRef,
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

import {
    ElementNode,
    TitaniumElement
} from '../../vdom';

import {
    Logger
} from '../../log';

@Directive({
    selector: 'ti-router-outlet'
})
export class TitaniumRouterOutletDirective implements OnInit, OnDestroy {
    private activated: ComponentRef<any> | null = null;
    private _activatedRoute: ActivatedRoute | null = null;
    private name: string;
    private isInitialRoute = true;
    private topLevelWindow = null;

    @Output('activate') activateEvents = new EventEmitter<any>();
    @Output('deactivate') deactivateEvents = new EventEmitter<any>();

    constructor(
        private parentContexts: ChildrenOutletContexts,
        private location: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Attribute('name') name: string,
        private changeDetector: ChangeDetectorRef,
        private logger: Logger){
        this.name = name || PRIMARY_OUTLET;
        parentContexts.onChildOutletCreated(this.name, <any>this);
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
        if (!this.isActivated) {
            const context = this.parentContexts.getContext(this.name);
            if (context && context.route) {
                if (context.attachRef) {
                    this.attach(context.attachRef, context.route);
                } else {
                    this.activateWith(context.route, context.resolver || null);
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.logger.trace('TitaniumRouterOutlet.ngOnDestroy');
        this.parentContexts.onChildOutletDestroyed(this.name);
    }

    activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }

        this._activatedRoute = activatedRoute;

        const { component } = activatedRoute.routeConfig;
        resolver = resolver || this.resolver;
        const factory = resolver.resolveComponentFactory(component);
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
        // @todo Make sure to load additional components via a detached loader
        this.activated = this.location.createComponent(factory, this.location.length, injector);

        if (this.isInitialRoute) {
            this.openTopLevelWindow();
        } else {
            // @todo: Implement proper handling of subsequent routes
            const componentElement: ElementNode = this.activated.location.nativeElement;
            componentElement.remove();
            if (componentElement.firstElementChild instanceof TitaniumElement) {
                const titaniumView = componentElement.firstElementChild.titaniumView;
                if (typeof titaniumView.open === 'function') {
                    titaniumView.open();
                }
            }
        }

        this.changeDetector.markForCheck();

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

    attach(ref: ComponentRef<any>, activedRoute: ActivatedRoute) {
        this.logger.trace('TitaniumRouterOutlet.attach');

        this.activated = ref;
        this._activatedRoute = activedRoute;
    }

    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     */
    detach(): ComponentRef<any> {
        this.logger.trace('TitaniumRouterOutlet.detach');

        if (!this.activated) {
            throw new Error('Outlet is not activated');
        }
        //this.location.detach();
        const componentRef = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        return componentRef;
    }

    private openTopLevelWindow() {
        this.logger.trace('TitaniumRouterOutlet: Initial route, calling open() on component\'s top-level view');

        let couldOpenView = false;
        const componentElement: ElementNode = this.activated.location.nativeElement;
        componentElement.parentElement.removeChild(componentElement);
        if (componentElement.firstElementChild instanceof TitaniumElement) {
            const titaniumView = componentElement.firstElementChild.titaniumView;
            if (typeof titaniumView.open === 'function') {
                titaniumView.open();
                couldOpenView = true;
            }
        }

        if (!couldOpenView) {
            this.logger.warn('Could not automatically open the component from your initial route.');
            this.logger.warn('Make sure the root view from your component is a Window or TabGroup');
        }

        this.topLevelWindow = (<TitaniumElement>componentElement.firstElementChild).titaniumView;
        this.isInitialRoute = false;
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