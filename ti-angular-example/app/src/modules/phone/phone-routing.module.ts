import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

const phoneRoutes: Routes = [
    {
        path: 'phone',
        children: [
            
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