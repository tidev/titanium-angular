import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TitaniumModule } from 'titanium-angular';
import { RendererTestComponent } from './app.component';
import { ItemComponent } from './item.component';
import { TestComponent } from './test.component';

@NgModule({
    declarations: [RendererTestComponent, ItemComponent, TestComponent],
    bootstrap: [RendererTestComponent],
    imports: [TitaniumModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

}