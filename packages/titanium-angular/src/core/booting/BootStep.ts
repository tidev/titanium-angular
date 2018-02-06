import { TitaniumPlatformRef } from '../TitaniumPlatformRef';

export class BootStep {
    constructor(private identifier, private callback) {

    }

    invoke(platform: TitaniumPlatformRef) {
        console.log(`Invoking boot sequence step ${this.identifier}`);
        
        this.callback.call(null, platform);
    }
}