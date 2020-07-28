import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'base-button',
  template: `
    <Button
      color="#fff"
      disabledColor="#c7c7c7"
      background-color="#1976d2"
      disabled-background-color="#aaa"
      height="40"
      width="160"
      border-radius="20"
    ><ng-content></ng-content></Button>
  `
})
export class BaseButton {}
