import { CommonModule } from "@angular/common";

import {
    NgModule
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
    ]
})
export class TitaniumCommonModule {

}