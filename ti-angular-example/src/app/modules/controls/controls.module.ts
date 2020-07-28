import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { ControlsComponent } from './controls.component';
import { ControlsRoutingModule } from './controls-routing.module';

import { DialogsComponent } from './components/dialogs/dialogs.component';
import { ImageViewComponent } from './components/views/image-view/image-view.component';
import { ItemComponent } from './components/views/list-view/item.component';
import { ListViewComponent } from './components/views/list-view/list-view.component';
import { ScrollViewComponent } from './components/views/scroll-view/scroll-view.component';
import { ScrollableViewComponent } from './components/views/scrollable-view/scrollable-view.component';
import { TableViewComponent } from './components/views/table-view/table-view.component';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/views/view/view.component';
import { WebViewComponent } from './components/views/web-view/web-view.component';

import { InputModule } from './components/input/input.module';
import { PlatformModule } from './components/platform/platform.module';
import { SharedModule } from '@/shared/shared.module';
import { UtilityModule } from './components/utility/utility.module';

@NgModule({
    imports: [
        TitaniumCommonModule,
        ControlsRoutingModule,
        InputModule,
        PlatformModule,
        SharedModule,
        UtilityModule
    ],
    declarations: [
        DialogsComponent,
        ControlsComponent,
        ImageViewComponent,
        ItemComponent,
        ListViewComponent,
        ScrollViewComponent,
        ScrollableViewComponent,
        TableViewComponent,
        ViewComponent,
        ViewsComponent,
        WebViewComponent
    ],
    exports: [
        ControlsComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ControlsModule { }