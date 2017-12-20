import {
    ErrorHandler
} from '@angular/core';

import {
    Logger
} from './log'

export class TitaniumErrorHandler extends ErrorHandler {

    private logger: Logger;

    constructor(logger: Logger) {
        super();
        this.logger = logger;
    }

    handleError(error: any): void {
        this.logger.error(error.message);
        this.logger.error(error.stack);
    }
}