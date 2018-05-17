import { Sanitizer } from '@angular/core';

export class TitaniumSanitizer extends Sanitizer {
    sanitize(_context: any, value: string): string {
        return value;
    }
}