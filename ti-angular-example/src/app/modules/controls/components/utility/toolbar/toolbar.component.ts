import { Component } from '@angular/core';
import { Logger, TitaniumRouter, WithTiGlobal } from 'titanium-angular';

@Component({
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent extends WithTiGlobal() {
  constructor(private logger: Logger, private router: TitaniumRouter) {
    super();
  }

  send(event) {
    this.logger.info('Pressed "Send" button!');
  }

  openCamera(event) {
    this.logger.info('Pressed "Camera" button!');
  }

  cancel(event) {
    this.router.back();
  }
}
