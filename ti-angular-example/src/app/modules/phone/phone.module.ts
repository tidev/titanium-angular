import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { CameraComponent } from './components/camera/camera.component';
import { PhoneComponent } from './phone.component';
import { PhoneRoutingModule } from './phone-routing.module';

@NgModule({
    imports: [
        TitaniumCommonModule,
        PhoneRoutingModule
    ],
    declarations: [
        CameraComponent,
        PhoneComponent
    ],
    exports: [
        PhoneComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PhoneModule { }