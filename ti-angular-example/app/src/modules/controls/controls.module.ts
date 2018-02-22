import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';

import { ControlsComponent } from './controls.component';
import { ControlsRoutingModule } from './controls-routing.module';
import { ActivityIndicatorComponent } from './components/activity-indicator/activity-indicator.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { BlurViewComponent } from './components/blur-view/blur-view.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { LabelComponent } from './components/label/label.component';
import { ItemComponent } from './components/list-view/item.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { PickerComponent } from './components/picker/picker.component';
import { ScrollableViewComponent } from './components/scrollable-view/scrollable-view.component';
import { SliderComponent } from './components/slider/slider.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SwitchControlComponent  } from './components/switch-control/switch-control.component';
import { TabbedBarComponent } from './components/tabbed-bar/tabbed-bar.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ToolbarComponent } from './components/toolbar/toolbar.compnent';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/view/view.component';
import { WebViewComponent } from './components/web-view/web-view.component';

@NgModule({
    imports: [
        TitaniumCommonModule,
        ControlsRoutingModule
    ],
    declarations: [
        ActivityIndicatorComponent,
        AlertDialogComponent,
        BlurViewComponent,
        ControlsComponent,
        ImageViewComponent,
        ItemComponent,
        LabelComponent,
        ListViewComponent,
        PickerComponent,
        ScrollableViewComponent,
        SliderComponent,
        StepperComponent,
        SwitchControlComponent,
        TabbedBarComponent,
        TextAreaComponent,
        TextFieldComponent,
        ToolbarComponent,
        ViewComponent,
        ViewsComponent,
        WebViewComponent
    ],
    exports: [
        ControlsComponent
    ]
})
export class ControlsModule { }