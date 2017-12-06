import {
    Injectable
} from '@angular/core';

@Injectable()
export class DeviceEnvironment {

    get platformName() {
        return Ti.Platform.osname;
    }

    runsIn(name: string) {
        if (name === 'ios') {
            return ['iphone', 'ipad'].indexOf(this.platformName) !== -1;
        }

        return name === this.platformName;
    }

}