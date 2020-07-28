import {
    CompilerOptions,
    Injector,
    NgModule,
    NgModuleFactory,
    NgModuleRef,
    NgZone,
    PlatformRef,
    Type,
    CompilerFactory
} from '@angular/core';

import { Logger } from '../log';

function compileNgModuleFactory<M>(injector: Injector, options: CompilerOptions, moduleType: Type<M>): Promise<NgModuleFactory<M>> {
    const compilerFactory: CompilerFactory = injector.get(CompilerFactory);
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}

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

    get injector(): Injector {
        return this._platform.injector;
    }

    get logger(): Logger {
        return this.injector.get(Logger);
    }

    get destroyed() {
        return this._platform.destroyed;
    }

    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>> {
        this._runBootstrap = () => this._platform.bootstrapModuleFactory(moduleFactory);

        this.logger.trace('Bootstrapping module using factory');
        return this.bootstrapApp<M>();
    }

    bootstrapModule<M>(moduleType: Type<M>, compilerOptions: CompilerOptions | CompilerOptions[] = []): Promise<NgModuleRef<M>> {
        this._runBootstrap = () => this._platform.bootstrapModule(moduleType, compilerOptions);

        this.logger.trace('Bootstrapping module');
        return this.bootstrapApp<M>();
    }

    bootstrapApp<M>(): Promise<NgModuleRef<M>> {
        // @todo: is this still needed? Is there any bootstrapping left?

        return this._runBootstrap();
    }

    onDestroy(callback: () => void): void {
        this._platform.onDestroy(callback);
    }

    destroy() {
        this.logger.debug('destroy TitaniumPlatformRef');
    }
}