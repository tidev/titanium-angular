import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'DetachedView',
    template: `<View detached #loader></View>`
})
export class DetachedLoaderComponent {
    constructor(
        private resolver: ComponentFactoryResolver,
        private containerRef: ViewContainerRef
    ) { }

    public loadComponent(componentType: Type<any>): ComponentRef<any> {
        const factory = this.resolver.resolveComponentFactory(componentType);
        return this.loadWithFactory(factory);
    }

    public loadWithFactory(factory: ComponentFactory<any>): ComponentRef<any> {
        return this.containerRef.createComponent(factory, this.containerRef.length, this.containerRef.parentInjector, null);
    }
}
