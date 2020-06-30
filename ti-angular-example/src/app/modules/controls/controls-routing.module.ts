import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { DialogsComponent } from './components/dialogs/dialogs.component';
import { InputsComponent } from './components/input/inputs.component';
import { ImageViewComponent } from './components/views/image-view/image-view.component';
import { ListViewComponent } from './components/views/list-view/list-view.component';
import { ScrollViewComponent } from './components/views/scroll-view/scroll-view.component';
import { ScrollableViewComponent } from './components/views/scrollable-view/scrollable-view.component';
import { TableViewComponent } from './components/views/table-view/table-view.component';
import { ViewsComponent } from './components/views/views.component';
import { ViewComponent } from './components/views/view/view.component';
import { WebViewComponent } from './components/views/web-view/web-view.component';

const controlsRoutes: Routes = [
    {
        path: 'controls',
        children: [
            {
                path: 'views',
                children: [
                    { path: '', component: ViewsComponent },
                    { path: 'image-view', component: ImageViewComponent },
                    { path: 'list-view', component: ListViewComponent },
                    { path: 'table-view', component: TableViewComponent },
                    { path: 'scroll-view', component: ScrollViewComponent },
                    { path: 'scrollable-view', component: ScrollableViewComponent },
                    { path: 'view', component: ViewComponent },
                    { path: 'web-view', component: WebViewComponent }
                ]
            },
            { path: 'inputs', component: InputsComponent },
            { path: 'dialogs', component: DialogsComponent }
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