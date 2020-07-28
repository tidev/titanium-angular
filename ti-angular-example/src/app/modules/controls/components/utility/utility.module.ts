import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from '@/shared/shared.module';

import { UtilityRoutingModule } from './utility-routing.module';
import { UtilityViews } from './utility-views.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { MaskedImageComponent } from './masked-image/masked-image.component';
import { FormatBytesPipe } from './progress-indicators/format-bytes.pipe';
import { ProgressIndicatorsComponent } from './progress-indicators/progress-indicators.component';
import { RefreshControlComponent } from './refresh-control/refresh-control.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    SharedModule,
    UtilityRoutingModule
  ],
  declarations: [
    UtilityViews,
    ButtonBarComponent,
    FormatBytesPipe,
    MaskedImageComponent,
    ProgressIndicatorsComponent,
    SearchBarComponent,
    RefreshControlComponent,
    ToolbarComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UtilityModule {

}