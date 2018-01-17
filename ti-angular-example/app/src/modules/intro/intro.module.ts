import { NgModule } from '@angular/core';
import { TitaniumCommonModule } from 'titanium-angular';
import { IntroComponent } from './intro.component';
import { IntroRoutingModule } from './intro-routing.module';

@NgModule({
    imports: [
        TitaniumCommonModule,
        IntroRoutingModule
    ],
    declarations: [
        IntroComponent
    ],
    exports: [
        IntroComponent
    ]
})
export class IntroModule { }