import { Injectable } from '@angular/core';

import { LoggerInterface } from './LoggerInterface'

@Injectable()
export class Logger implements LoggerInterface {
    info(...message: any[]): void {
        console.log(...message);
    }

    debug(...message: any[]): void {
        console.debug(...message);
    }

    trace(...message: any[]): void {
        console.trace(...message);
    }

    warn(...message: any[]): void {
        console.warn(...message);
    }

    error(...message: any[]): void {
        console.error(...message);
    }
}