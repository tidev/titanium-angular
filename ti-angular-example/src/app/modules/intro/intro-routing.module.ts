import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';
import { IntroComponent } from './intro.component';
import { IntroGuard } from './services/intro-guard.service';

const introRoutes: Routes = [
    {
        path: 'intro',
        component: IntroComponent
    }
];

@NgModule({
    imports: [
        TitaniumRouterModule.forChild(introRoutes)
    ],
    exports: [
        TitaniumRouterModule
    ],
    providers: [
        IntroGuard
    ]
})
export class IntroRoutingModule { }