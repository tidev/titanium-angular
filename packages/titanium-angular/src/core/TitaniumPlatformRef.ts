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

import { TransitionRegistry } from '../animation';
import { Logger } from '../log';
import { DeviceEnvironment } from '../services';
import { TitaniumElementRegistry } from '../vdom';
import { BootSequence, BootStep } from './booting';
import { initializeTitaniumElements, initializeNavigationTransitions } from './booting/scripts';

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
        this.bootstrapApp();

        return null;
    }

    bootstrapModule<M>(moduleType: Type<M>, compilerOptions: CompilerOptions | CompilerOptions[] = []): Promise<NgModuleRef<M>> {
        this._runBootstrap = () => this._platform.bootstrapModule(moduleType, compilerOptions);

        this.logger.trace('Bootstrapping module');
        this.bootstrapApp();

        return null;
    }

    bootstrapApp(): void {
        const bootSequence = this.buildPlatformBootSequence();
        bootSequence.invoke(this);

        this._runBootstrap().then(moduleRef => {
            this.logger.info('ANGULAR BOOTSTRAP DONE!');
        }, err => {
            this.logger.error('ERROR BOOTSTRAPPING ANGULAR!');
            const errorMessage = err.message + "\n\n" + err.stack;
            this.logger.error(errorMessage);
        });
    }

    buildPlatformBootSequence(): BootSequence {
        const sequence = new BootSequence();
        sequence.addStep(new BootStep('titanium.elements', initializeTitaniumElements));
        sequence.addStep(new BootStep('titanium.transitions', initializeNavigationTransitions));
        return sequence;
    }

    onDestroy(callback: () => void): void {
        this._platform.onDestroy(callback);
    }

    destroy() {
        this.logger.debug('destroy TitaniumPlatformRef');
    }
}