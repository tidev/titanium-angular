import {
    Injectable
} from '@angular/core';

export interface LoggerInterface {
    info(message: string): void;
    debug(message: string): void;
    trace(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

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