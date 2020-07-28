import { Routes } from '@angular/router';

import { BlurViewComponent } from './ios/blur-view/blur-view.component';
import { LivePhotoComponent } from './ios/live-photo/live-photo.component';
import { StepperComponent } from './ios/stepper/stepper.component';

export const platformRoutes: Routes = [
  { path: 'blur-view', component: BlurViewComponent },
  { path: 'live-photo', component: LivePhotoComponent },
  { path: 'stepper', component: StepperComponent }
]
