import { NgModule } from '@angular/core';
import { platformTitaniumDynamic, TitaniumModule } from 'titanium-angular';
import { RendererTestComponent } from './app.component';
import { ItemComponent } from './item.component';
import { TestComponent} from './test.component';

@NgModule({
    imports: [TitaniumModule],
    declarations: [RendererTestComponent, ItemComponent, TestComponent],
    bootstrap: [RendererTestComponent]
})
class AppModule {

}

platformTitaniumDynamic().bootstrapModule(AppModule);