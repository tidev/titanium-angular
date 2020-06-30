import { Component, Input } from '@angular/core';

@Component({
  selector: 'base-window',
  templateUrl: 'window.component.html'
})
export class BaseWindow {
  @Input() title: string
}
