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
    ELEMENT_REGISTRY,
    TitaniumElementRegistry
} from '../vdom';

type BootstrapFunction = () => Promise<NgModuleRef<any>>;
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

    private _runBootstrap: BootstrapFunction;
    private _platform: PlatformRef;

    constructor(platform: PlatformRef) {
        super();

        this._platform = platform;
    }

    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>> {
        this._runBootstrap = () => this._platform.bootstrapModuleFactory(moduleFactory);

        console.log('bootstrapModuleFactory');
        this.bootstrapApp();

        return null;
    }

    bootstrapModule<M>(moduleType: Type<M>, compilerOptions: CompilerOptions | CompilerOptions[] = []): Promise<NgModuleRef<M>> {
        this._runBootstrap = () => this._platform.bootstrapModule(moduleType, compilerOptions);

        console.log('bootstrapModule');
        this.bootstrapApp();

        return null;
    }

    bootstrapApp(): void {
        this.registerTitaniumViews();

        this._runBootstrap().then(moduleRef => {
            console.log('ANGULAR BOOTSTRAP DONE!');
        }, err => {
            console.log('ERROR BOOTSTRAPPING ANGULAR!');
            const errorMessage = err.message + "\n\n" + err.stack;
            console.error(errorMessage);
        });
    }

    registerTitaniumViews() {
        const titaniumElementRegistry: TitaniumElementRegistry = this.injector.get(ELEMENT_REGISTRY);
        titaniumElementRegistry.registerElement('ActivityIndicator', () => Ti.UI.createActivityIndicator, { typeName: 'Ti.UI.ActivityIndicator' });
        titaniumElementRegistry.registerElement('AlertDialog', () => Ti.UI.createAlertDialog, { typeName: 'Ti.UI.AlertDialog' });
        titaniumElementRegistry.registerElement('Button', () => Ti.UI.createButton, { typeName: 'Ti.UI.Button' });
        titaniumElementRegistry.registerElement('DashboardView', () => Ti.UI.createDashboardView, { typeName: 'Ti.UI.DashboardView' });
        titaniumElementRegistry.registerElement('DashboardItem', () => Ti.UI.createDashboardItem, { typeName: 'Ti.UI.DashboardItem' });
        titaniumElementRegistry.registerElement('ImageView', () => Ti.UI.createImageView, { typeName: 'Ti.UI.ImageView' });
        titaniumElementRegistry.registerElement('Label', () => Ti.UI.createLabel, { typeName: 'Ti.UI.Label' });
        titaniumElementRegistry.registerElement('ListView', () => Ti.UI.createListView, { typeName: 'Ti.UI.ListView' });
        titaniumElementRegistry.registerElement('ListItem', () => Ti.UI.createListItem, { skipAddToDom: true, typeName: 'Ti.UI.ListItem' });
        titaniumElementRegistry.registerElement('ListSection', () => Ti.UI.createListSection, { skipAddToDom: true, typeName: 'Ti.UI.ListSection' });
        titaniumElementRegistry.registerElement('OptionDialog', () => Ti.UI.createOptionDialog, { typeName: 'Ti.UI.OptionDialog' });
        titaniumElementRegistry.registerElement('Picker', () => Ti.UI.createPicker, { typeName: 'Ti.UI.Picker' });
        titaniumElementRegistry.registerElement('PickerColumn', () => Ti.UI.createPickerColumn, { skipAddToDom: true, typeName: 'Ti.UI.PickerColumn' });
        titaniumElementRegistry.registerElement('PickerRow', () => Ti.UI.createPickerRow, { skipAddToDom: true, typeName: 'Ti.UI.PickerRow' });
        titaniumElementRegistry.registerElement('ProgressBar', () => Ti.UI.createProgressBar, { typeName: 'Ti.UI.ProgressBar' });
        titaniumElementRegistry.registerElement('RefreshControl', () => Ti.UI.createRefreshControl, { skipAddToDom: true, typeName: 'Ti.UI.RefreshControl' });
        titaniumElementRegistry.registerElement('ScrollableView', () => Ti.UI.createScrollableView, { typeName: 'Ti.UI.ScrollableView' });
        titaniumElementRegistry.registerElement('ScrollView', () => Ti.UI.createScrollView, { typeName: 'Ti.UI.ScrollView' });
        titaniumElementRegistry.registerElement('SearchBar', () => Ti.UI.createSearchBar, { typeName: 'Ti.UI.SearchBar' });
        titaniumElementRegistry.registerElement('Slider', () => Ti.UI.createSlider, { typeName: 'Ti.UI.Slider' });
        titaniumElementRegistry.registerElement('Switch', () => Ti.UI.createSwitch, { typeName: 'Ti.UI.Switch' });
        titaniumElementRegistry.registerElement('Tab', () => Ti.UI.createTab, { skipAddToDom: true, typeName: 'Ti.UI.Tab' });
        titaniumElementRegistry.registerElement('TabGroup', () => Ti.UI.createTabGroup, { skipAddToDom: true, typeName: 'Ti.UI.TabGroup' });
        titaniumElementRegistry.registerElement('TextArea', () => Ti.UI.createTextArea, { typeName: 'Ti.UI.TextArea' });
        titaniumElementRegistry.registerElement('TextField', () => Ti.UI.createTextField, { typeName: 'Ti.UI.TextField' });
        titaniumElementRegistry.registerElement('Toolbar', () => Ti.UI.createToolbar, { typeName: 'Ti.UI.Toolbar' });
        titaniumElementRegistry.registerElement('TextField', () => Ti.UI.createTextField, { typeName: 'Ti.UI.TextField' });
        titaniumElementRegistry.registerElement('View', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
        titaniumElementRegistry.registerElement('WebView', () => Ti.UI.createWebView, { typeName: 'Ti.UI.WebView' });
        titaniumElementRegistry.registerElement('Window', () => Ti.UI.createWindow, { skipAddToDom: true, typeName: 'Ti.UI.Window'});
    }

    onDestroy(callback: () => void): void {
        this._platform.onDestroy(callback);
    }

    get injector(): Injector {
        return this._platform.injector;
    }

    destroy() {
        console.log('destroy TitaniumPlatformRef');
    }

    get destroyed() {
        return this._platform.destroyed;
    }
}