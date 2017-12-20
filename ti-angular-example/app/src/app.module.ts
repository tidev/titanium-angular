import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TitaniumModule } from 'titanium-angular';
import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import { TestComponent } from './test.component';

@NgModule({
    declarations: [AppComponent, ItemComponent, TestComponent],
    bootstrap: [AppComponent],
    imports: [TitaniumModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

}