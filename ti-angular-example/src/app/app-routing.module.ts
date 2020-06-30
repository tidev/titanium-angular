import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TitaniumRouterModule } from 'titanium-angular';

import { HomeComponent } from './modules/home/home.component';
import { IntroGuard } from './modules/intro/services/intro-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [IntroGuard] }
];

@NgModule({
    imports: [TitaniumRouterModule.forRoot(appRoutes, { enableTracing: false })],
    exports: [TitaniumRouterModule]
})
export class AppRoutingModule {
}