import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { BaseButton } from './components/button.component';
import { FontAwesomeIcon } from './components/icon.component';
import { Alert } from './components/alert.component';
import { BaseLabel } from './components/label.component';
import { BaseWindow } from './components/window.component'
import { NavTable } from './components/nav-table.component';
import { TitaniumCommonModule } from 'titanium-angular';

const COMPONENTS = [
  Alert,
  BaseButton,
  BaseLabel,
  BaseWindow,
  FontAwesomeIcon,
  NavTable
]

@NgModule({
  imports: [
    TitaniumCommonModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    TitaniumCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {

}