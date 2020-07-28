import { Component } from '@angular/core';
@Component({
    templateUrl: './button-bar.component.html'
})
export class ButtonBarComponent {
  doSomething(e) {
    Ti.API.info(`Clicked button with index ${e.index}`);
  }
}
