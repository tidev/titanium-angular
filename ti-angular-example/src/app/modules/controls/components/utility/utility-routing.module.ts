import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { UtilityViews } from './utility-views.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { MaskedImageComponent } from './masked-image/masked-image.component';
import { ProgressIndicatorsComponent } from './progress-indicators/progress-indicators.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RefreshControlComponent } from './refresh-control/refresh-control.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const utilityRoutes: Routes = [
  {
    path: 'controls',
    children: [
      {
        path: 'utility',
        children: [
          { path: '', component: UtilityViews },
          { path: 'button-bar', component: ButtonBarComponent },
          { path: 'masked-image', component: MaskedImageComponent },
          { path: 'progress-indicators', component: ProgressIndicatorsComponent },
          { path: 'refresh-control', component: RefreshControlComponent },
          { path: 'search-bar', component: SearchBarComponent },
          { path: 'toolbar', component: ToolbarComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    TitaniumRouterModule.forChild(utilityRoutes)
  ],
  exports: [
    TitaniumRouterModule
  ]
})
export class UtilityRoutingModule { }