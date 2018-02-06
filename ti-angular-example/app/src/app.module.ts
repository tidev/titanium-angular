import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TitaniumModule, Logger } from 'titanium-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { IntroModule } from './modules/intro/intro.module';

@NgModule({
    imports: [
        TitaniumModule,
        HomeModule,
        IntroModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
    constructor(router: Router, logger: Logger) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));

        router.events.subscribe(e => {
            logger.debug(`\n--- Router Event: ${(<any>e.constructor).name}`);
            logger.debug(e.toString());
            logger.debug('---\n');
        });
    }
}