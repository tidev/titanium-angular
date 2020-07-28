import { Component } from '@angular/core';

@Component({
  selector: 'horizontal-layout,HorizontalLayout',
  template: `
    <view layout="horizontal">
      <ng-content></ng-content>
    </view>
  `
})
export class HorizontalLayoutComponent {}
