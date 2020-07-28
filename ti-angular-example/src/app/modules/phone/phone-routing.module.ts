import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { CameraComponent } from './components/camera/camera.component';

const phoneRoutes: Routes = [
    {
        path: 'phone',
        children: [
            { path: 'camera', component: CameraComponent },
        ]
    }
];

@NgModule({
    imports: [
        TitaniumRouterModule.forChild(phoneRoutes)
    ],
    exports: [
        TitaniumRouterModule
    ]
})
export class PhoneRoutingModule { }