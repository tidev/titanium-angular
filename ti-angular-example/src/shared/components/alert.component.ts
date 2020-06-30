import { WithTiGlobal } from 'titanium-angular';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

const colorTable = {
  info: '#2973b7',
  error: '#f66'
}

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class Alert extends WithTiGlobal() {
  @Input() type = 'info'

  @ViewChild('borderView')
  set borderView(borderRef: ElementRef) {
    this._borderView = borderRef.nativeElement.titaniumView;
  }

  @ViewChild('contentView')
  set contentView(contentRef: ElementRef) {
    this._contentView = contentRef.nativeElement.titaniumView;
  }

  private _borderView!: Titanium.UI.View

  private _contentView!: Titanium.UI.View

  get primaryColor(): string {
    return colorTable[this.type];
  }

  computeHeight() {
    if (!this._contentView || !this._borderView) {
      return;
    }

    const computedHeight = this._contentView.size.height + 24;
    const currentBorderHeight = this._borderView.size.height;
    if (currentBorderHeight !== computedHeight) {
      this._borderView.height = computedHeight;
    }
  }
}