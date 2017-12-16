import { CommonModule } from "@angular/common";

import {
    NgModule,
    NO_ERRORS_SCHEMA
} from '@angular/core';

import { TITANIUM_DIRECTIVES } from './directives';

@NgModule({
    declarations: [
        ...TITANIUM_DIRECTIVES
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        ...TITANIUM_DIRECTIVES
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TitaniumCommonModule {

}