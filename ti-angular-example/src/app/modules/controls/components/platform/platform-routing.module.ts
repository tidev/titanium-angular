import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { PlatformComponent } from './platform.component';
import { platformRoutes as routes } from './routes';

const platformRoutes: Routes = [
  {
    path: 'controls',
    children: [
      {
        path: 'platform',
        children: [
          { path: '', component: PlatformComponent },
          ...routes
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    TitaniumRouterModule.forChild(platformRoutes)
  ],
  exports: [
    TitaniumRouterModule
  ]
})
export class PlatformRoutingModule { }