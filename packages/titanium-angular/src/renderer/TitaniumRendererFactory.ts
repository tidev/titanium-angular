import {
    Inject,
    Injectable,
    Optional,
    NgZone,
    RendererFactory2,
    RendererType2,
    ViewEncapsulation,
} from '@angular/core';

import {
    RootViewService,
    TitaniumRenderer
} from '.';

import {
    RootNode,
    TitaniumElementRegistry
} from '../vdom';

@Injectable()
export class TitaniumRendererFactory implements RendererFactory2 {

    private titaniumElementRegistry: TitaniumElementRegistry

    private rootView: RootNode;

    private defaultRenderer: TitaniumRenderer;

    constructor(rootViewService: RootViewService, titaniumElementRegistry: TitaniumElementRegistry) {
        this.setAngularRootView(rootViewService.getRootView());
        this.titaniumElementRegistry = titaniumElementRegistry;
        this.defaultRenderer = new TitaniumRenderer(this.rootView, this.titaniumElementRegistry);
    }

    private setAngularRootView(rootView: any): void {
        this.rootView = new RootNode(rootView);
    }

    createRenderer(hostElement: any, type: RendererType2): TitaniumRenderer {
        console.log('TitaniumRendererFactory.createRenderer');
        console.log(hostElement, type);
        if (!hostElement || !type) {
            return this.defaultRenderer;
        }
        return new TitaniumRenderer(this.rootView, this.titaniumElementRegistry);
    }

}