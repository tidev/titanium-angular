import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { CardViewComponent } from './android/card-view/card-view.component';
import { ProgressIndicatorComponent } from './android/progress-indicator/progress-indicator.component';
import { SearchViewComponent } from './android/search-view/search-view.component';
import { PlatformComponent } from './platform.component';
import { PlatformRoutingModule } from './platform-routing.module';

import { SharedModule } from '@/shared/shared.module';

const PLATFORM_COMPONENTS = [
  PlatformComponent,
  CardViewComponent,
  ProgressIndicatorComponent,
  SearchViewComponent
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