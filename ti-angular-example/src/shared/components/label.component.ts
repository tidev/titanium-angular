import { Component, Input } from '@angular/core';

@Component({
  selector: 'base-label',
  template: `<label [color]="color" [font]="font"><ng-content></ng-content></label>`
})
export class BaseLabel {
  @Input() color = '#444';

  @Input() fontFamily?: string;

  @Input() fontSize?: string;

  @Input() fontStyle?: string;

  @Input() fontWeight?: string;

  get font(): Font {
    return {
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontWeight: this.fontWeight
    }
  }
}