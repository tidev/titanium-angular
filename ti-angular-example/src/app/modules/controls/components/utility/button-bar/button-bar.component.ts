import { Component } from '@angular/core';
import { DeviceEnvironment } from 'titanium-angular';

@Component({
    templateUrl: './button-bar.component.html'
})
export class ButtonBarComponent {
  constructor(private device: DeviceEnvironment) {}

  get isIos() {
    return this.device.runs('ios');
  }

  doSomething(e) {
    Ti.API.info(`Clicked button with index ${e.index}`);
  }
}
