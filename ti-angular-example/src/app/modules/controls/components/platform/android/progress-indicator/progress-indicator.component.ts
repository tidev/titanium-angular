import { Component, ElementRef, ViewChild } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

// @fixme: ProgressIndicator type is missing value property
type ProgressIndicator = Ti.UI.Android.ProgressIndicator & { value: number }

@Component({
  templateUrl: 'progress-indicator.component.html'
})
export class ProgressIndicatorComponent extends WithTiGlobal() {
  @ViewChild('dialog')
  set dialog(el: ElementRef) {
    this._dialogIndicator = el.nativeElement.titaniumView;
  }

  private _dialogIndicator: ProgressIndicator

  constructor() {
    super();
  }

  loadThat() {
    this._dialogIndicator.show();
    // do some async loading here ...
    setTimeout(() => this._dialogIndicator.hide(), 1500);
  }
}
