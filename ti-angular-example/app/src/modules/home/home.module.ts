import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { HomeComponent } from './home.component';
import { ControlsModule } from '../controls/controls.module';
import { PhoneModule } from '../phone/phone.module';

@NgModule({
    imports: [
        TitaniumCommonModule,
        ControlsModule,
        PhoneModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }