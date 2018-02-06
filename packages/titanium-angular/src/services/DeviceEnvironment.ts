import {
    Injectable
} from '@angular/core';

/**
 * Utility class to query info about the device environment.
 * 
 * Internally uses Ti.Platform.*.
 */
@Injectable()
export class DeviceEnvironment {

    /**
     * Returns the platform name of this device.
     * 
     * Can be either android, ios or windows.
     */
    get platformName() {
        return Ti.Platform.osname;
    }

    /**
     * Checks if the current devie runs the specified OS / platform name
     * 
     * @param name Platform name to check, can be either android, ios or windows.
     */
    runs(name: string): boolean {
        if (name === 'ios') {
            return ['iphone', 'ipad'].indexOf(this.platformName) !== -1;
        }

        return name === this.platformName;
    }

}