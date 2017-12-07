import { NgModule } from '@angular/core';
import { platformTitaniumDynamic, TitaniumModule } from 'titanium-angular';
import { RendererTestComponent } from './app.component';
import { ItemComponent } from './item.component';

@NgModule({
    imports: [TitaniumModule],
    declarations: [RendererTestComponent, ItemComponent],
    bootstrap: [RendererTestComponent]
})
class AppModule {

}

platformTitaniumDynamic().bootstrapModule(AppModule);