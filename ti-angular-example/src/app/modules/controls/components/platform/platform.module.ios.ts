import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { BlurViewComponent } from './ios/blur-view/blur-view.component';
import { LivePhotoComponent } from './ios/live-photo/live-photo.component';
import { StepperComponent } from './ios/stepper/stepper.component';
import { PlatformComponent } from './platform.component';
import { PlatformRoutingModule } from './platform-routing.module';

import { SharedModule } from '@/shared/shared.module';

const PLATFORM_COMPONENTS = [
  PlatformComponent,
  BlurViewComponent,
  LivePhotoComponent,
  StepperComponent
]

@NgModule({
  imports: [
    PlatformRoutingModule,
    SharedModule,
    TitaniumCommonModule
  ],
  declarations: [
    ...PLATFORM_COMPONENTS
  ],
  exports: [
    ...PLATFORM_COMPONENTS
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PlatformModule {

}