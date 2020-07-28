import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { IntroComponent } from './intro.component';
import { IntroRoutingModule } from './intro-routing.module';
import { SharedModule } from '@/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        IntroRoutingModule
    ],
    declarations: [
        IntroComponent
    ],
    exports: [
        IntroComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class IntroModule { }