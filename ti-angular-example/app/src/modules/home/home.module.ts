import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { HomeComponent } from './home.component';
import { ControlsModule } from '../controls/controls.module';

@NgModule({
    imports: [
        TitaniumCommonModule,
        ControlsModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }