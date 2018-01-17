import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { ControlsComponent } from './controls.component';
import { ControlsRoutingModule } from './controls-routing.module';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { LabelComponent } from './components/label/label.component';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/view/view.component';

@NgModule({
    imports: [
        TitaniumCommonModule,
        ControlsRoutingModule
    ],
    declarations: [
        ControlsComponent,
        ImageViewComponent,
        LabelComponent,
        ViewComponent,
        ViewsComponent
    ],
    entryComponents: [
        ImageViewComponent,
        LabelComponent,
        ViewComponent,
        ViewsComponent
    ],
    exports: [
        ControlsComponent
    ]
})
export class ControlsModule { }