import { NgModule } from '@angular/core';
import { platformTitaniumDynamic, TitaniumModule } from 'titanium-angular';
import { RendererTestComponent } from './app.component';

@NgModule({
    imports: [TitaniumModule],
    declarations: [RendererTestComponent],
    bootstrap: [RendererTestComponent]
})
class AppModule {

}

platformTitaniumDynamic().bootstrapModule(AppModule);