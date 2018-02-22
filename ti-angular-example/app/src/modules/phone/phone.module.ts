import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { PhoneComponent } from './phone.component';
import { PhoneRoutingModule } from './phone-routing.module';

@NgModule({
    imports: [
        TitaniumCommonModule,
        PhoneRoutingModule
    ],
    declarations: [
        PhoneComponent,
        
    ],
    exports: [
        PhoneComponent
    ]
})
export class PhoneModule { }