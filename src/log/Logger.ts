import {
    Injectable,
    InjectionToken
} from '@angular/core';

import {
    LoggerInterface
} from '.'

@Injectable()
export class Logger implements LoggerInterface {
    info(message: string): void {
        Ti.API.info(message);
    }

    debug(message: string): void {
        Ti.API.debug(message);
    }

    trace(message: string): void {
        Ti.API.trace(message);
    }

    warn(message: string): void {
        Ti.API.warn(message);
    }

    error(message: string): void {
        Ti.API.error(message);
    }
}