import {
    CompilerOptions,
    Injector,
    NgModule,
    NgModuleFactory,
    NgModuleRef,
    NgZone,
    PlatformRef,
    Type
} from '@angular/core';

import {
    ROOT_VIEW_SERVICE
} from '../renderer';

import {
    ELEMENT_REGISTRY,
    TitaniumElementRegistry
} from '../vdom';

type BootstrapperAction = () => Promise<NgModuleRef<any>>;
export interface BootstrapOptions {
    /**
     * Optionally specify which `NgZone` should be used.
     *
     * - Provide your own `NgZone` instance.
     * - `zone.js` - Use default `NgZone` which requires `Zone.js`.
     * - `noop` - Use `NoopNgZone` which does nothing.
     */
    ngZone?: NgZone | 'zone.js' | 'noop';
}

export class TitaniumPlatformRef extends PlatformRef {

    private _bootstrapper: BootstrapperAction;
    private platform: PlatformRef;

    constructor(platform: PlatformRef) {
        super();

        this.platform = platform;
    }

    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>> {
        this._bootstrapper = () => this.platform.bootstrapModuleFactory(moduleFactory);

        console.log('bootstrapModuleFactory');
        this.bootstrapApp();

        return null;
    }

    bootstrapModule<M>(moduleType: Type<M>, compilerOptions: CompilerOptions | CompilerOptions[] = []): Promise<NgModuleRef<M>> {
        this._bootstrapper = () => this.platform.bootstrapModule(moduleType, compilerOptions);

        console.log('bootstrapModule');
        this.bootstrapApp();

        return null;
    }

    bootstrapApp(): void {
        this.registerTitaniumViews();
        
        const rootViewService = this.injector.get(ROOT_VIEW_SERVICE);
        const rootView = rootViewService.getRootView();

        this._bootstrapper().then(moduleRef => {
            console.log('ANGULAR BOOTSTRAP DONE!');

            //rootView.open();
        }, err => {
            console.log('ERROR BOOTSTRAPPING ANGULAR!');
            const errorMessage = err.message + "\n\n" + err.stack;
            console.error(errorMessage);
        });
    }

    registerTitaniumViews() {
        console.log('registerTitaniumViews');
        const titaniumElementRegistry: TitaniumElementRegistry = this.injector.get(ELEMENT_REGISTRY);
        titaniumElementRegistry.registerElement('View', () => Ti.UI.createView, {});
        titaniumElementRegistry.registerElement('Window', () => Ti.UI.createWindow, {skipAddToDom: true});
        titaniumElementRegistry.registerElement('Label', () => Ti.UI.createLabel, {});
        titaniumElementRegistry.registerElement('TabGroup', () => Ti.UI.createTabGroup, {skipAddToDom: true});
        titaniumElementRegistry.registerElement('Tab', () => Ti.UI.createTab, {skipAddToDom: true});
    }

    onDestroy(callback: () => void): void {
        this.platform.onDestroy(callback);
    }

    get injector(): Injector {
        return this.platform.injector;
    }

    destroy() {
        console.log('destroy TitaniumPlatformRef');
    }

    get destroyed() {
        return this.platform.destroyed;
    }
}