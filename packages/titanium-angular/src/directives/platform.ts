import {
    EmbeddedViewRef,
    Directive,
    Inject,
    Input,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import {
    DeviceEnvironment
} from '../services';

import {
    NodeInterface
} from '../vdom';

export class PlatformContext {
    public filter: string = ''
}

@Directive({
    selector: '[platform]'
})
export class PlatformFilterDirective {

    private _context: PlatformContext = new PlatformContext();

    private _viewContainer: ViewContainerRef = null;

    private _templateRef: TemplateRef<PlatformContext> = null

    private _viewRef: EmbeddedViewRef<PlatformContext> = null;

    private _device: DeviceEnvironment = null;

    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<PlatformContext>, @Inject(DeviceEnvironment) device: DeviceEnvironment) {
        this._context = new PlatformContext();
        this._viewContainer = viewContainer;
        this._templateRef = templateRef;
        this._device = device;
    }

    @Input()
    set platform(filter: string) {
        this._context.filter = filter;
        this.updateView();
    }
    
    private updateView() {
        this._viewContainer.clear();

        if (typeof this._context.filter !== 'string') {
            return;
        }

        let renderOnCurrentPlatform = false;
        this._context.filter.split(',').forEach(platformFilterString => {
            let platformName = platformFilterString.trim();

            if (platformName[0] === '!') {
                platformName = platformName.slice(1);
                if (!this._device.runsIn(platformName)) {
                    renderOnCurrentPlatform = true;
                }
            } else {
                if (this._device.runsIn(platformName)) {
                    renderOnCurrentPlatform = true;
                }
            }
        });

        if (renderOnCurrentPlatform) {
            this._viewRef = this._viewContainer.createEmbeddedView(this._templateRef, this._context);
        }
    }
}