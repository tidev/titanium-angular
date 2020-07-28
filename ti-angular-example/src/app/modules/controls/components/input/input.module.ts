import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { InputDemo } from './input-demo.component';
import { InputsComponent } from './inputs.component';
import { SharedModule } from '@/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    InputDemo,
    InputsComponent
  ],
  exports: [
    InputsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InputModule {

}