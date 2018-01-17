import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { LabelComponent } from './components/label/label.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ScrollableViewComponent } from './components/scrollable-view/scrollable-view.component';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/view/view.component';

const controlsRoutes: Routes = [
    {
        path: 'controls',
        children: [
            {
                path: 'views',
                children: [
                    { path: '', component: ViewsComponent },
                    { path: 'view', component: ViewComponent },
                    { path: 'scrollable-view', component: ScrollableViewComponent },
                    { path: 'list-view', component: ListViewComponent },
                    { path: 'image-view', component: ImageViewComponent }
                ]
            },
            { path: 'label', component: LabelComponent },
            { path: 'alert-dialog', component: AlertDialogComponent}
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