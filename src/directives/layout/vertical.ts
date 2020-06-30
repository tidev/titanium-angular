import { Component } from '@angular/core';

@Component({
  selector: 'vertical-layout,VerticalLayout',
  template: `
    <view layout="vertical">
      <ng-content></ng-content>
    </view>
  `
})
export class VerticalLayoutComponent {}
