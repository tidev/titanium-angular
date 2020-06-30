import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'base-button',
  // outputs: [ 'click' ],
  template: `
    <Button
      color="#fff"
      background-color="#1976d2"
      height="40"
      width="160"
      border-radius="20"
    ><ng-content></ng-content></Button>
  `
})
export class BaseButton {
  // click: EventEmitter<any> = new EventEmitter()
}
