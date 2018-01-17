import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { ControlsComponent } from './controls.component';
import { ControlsRoutingModule } from './controls-routing.module';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { LabelComponent } from './components/label/label.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ScrollableViewComponent } from './components/scrollable-view/scrollable-view.component';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/view/view.component';

@NgModule({
    imports: [
        TitaniumCommonModule,
        ControlsRoutingModule
    ],
    declarations: [
        ControlsComponent,
        AlertDialogComponent,
        ImageViewComponent,
        LabelComponent,
        ListViewComponent,
        ScrollableViewComponent,
        ViewComponent,
        ViewsComponent
    ],
    entryComponents: [
        AlertDialogComponent,
        ImageViewComponent,
        LabelComponent,
        ListViewComponent,
        ScrollableViewComponent,
        ViewComponent,
        ViewsComponent
    ],
    exports: [
        ControlsComponent
    ]
})
export class ControlsModule { }