import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { ActivityIndicatorComponent } from './components/activity-indicator/activity-indicator.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { BlurViewComponent } from './components/blur-view/blur-view.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { LabelComponent } from './components/label/label.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ScrollableViewComponent } from './components/scrollable-view/scrollable-view.component';
import { SliderComponent } from './components/slider/slider.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SwitchControlComponent } from './components/switch-control/switch-control.component';
import { TabbedBarComponent } from './components/tabbed-bar/tabbed-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.compnent';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/view/view.component';
import { WebViewComponent } from './components/web-view/web-view.component';

const controlsRoutes: Routes = [
    {
        path: 'controls',
        children: [
            {
                path: 'views',
                children: [
                    { path: '', component: ViewsComponent },
                    { path: 'blur-view', component: BlurViewComponent },
                    { path: 'image-view', component: ImageViewComponent },
                    { path: 'list-view', component: ListViewComponent },
                    { path: 'scrollable-view', component: ScrollableViewComponent },
                    { path: 'view', component: ViewComponent },
                    { path: 'web-view', component: WebViewComponent }
                ]
            },
            { path: 'activity-indicator', component: ActivityIndicatorComponent },
            { path: 'alert-dialog', component: AlertDialogComponent },
            { path: 'label', component: LabelComponent },
            { path: 'slider', component: SliderComponent },
            { path: 'stepper', component: StepperComponent },
            { path: 'switch-control', component: SwitchControlComponent },
            { path: 'tabbed-bar', component: TabbedBarComponent },
            { path: 'toolbar', component: ToolbarComponent}
        ]
    }
];

@NgModule({
    imports: [
        TitaniumRouterModule.forChild(controlsRoutes)
    ],
    exports: [
        TitaniumRouterModule
    ]
})
export class ControlsRoutingModule { }