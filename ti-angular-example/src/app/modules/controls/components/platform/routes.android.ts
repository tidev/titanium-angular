import { Routes } from '@angular/router';

import { CardViewComponent } from './android/card-view/card-view.component';
import { ProgressIndicatorComponent } from './android/progress-indicator/progress-indicator.component';
import { SearchViewComponent } from './android/search-view/search-view.component';

export const platformRoutes: Routes = [
  { path: 'card-view', component: CardViewComponent },
  { path: 'progress-indicator', component: ProgressIndicatorComponent },
  { path: 'search-view', component: SearchViewComponent }
]
