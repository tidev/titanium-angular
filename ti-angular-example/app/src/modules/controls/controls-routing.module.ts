import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { ImageViewComponent } from './components/image-view/image-view.component';
import { LabelComponent } from './components/label/label.component';
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
                    { path: 'image-view', component: ImageViewComponent }
                ]
            },
            { path: 'label', component: LabelComponent }
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