import { NgModule } from "@angular/core";

import { TEMPLATE_DRIVEN_DIRECTIVES, SHARED_FORM_DIRECTIVES } from './directives'

@NgModule({
  declarations: [TEMPLATE_DRIVEN_DIRECTIVES, SHARED_FORM_DIRECTIVES],
  exports: [TEMPLATE_DRIVEN_DIRECTIVES]
})
export class FormModule {
}