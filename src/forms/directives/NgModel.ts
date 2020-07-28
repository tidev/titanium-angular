import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";

@Directive({
  selector: '[ngModel]:not([formControlName]):not([formControl])',
  exportAs: 'ngModel'
})
export class NgModel implements OnChanges {
  viewModel: any

  @Input() name = '';

  @Input() isDisabled = false;

  @Input('ngModel') model: any;

  @Output('ngModelChange') update = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    /*
    this._checkForErrors();
    if (!this._registered) this._setUpControl();
    if ('isDisabled' in changes) {
      this._updateDisabled(changes);
    }

    if (isPropertyUpdated(changes, this.viewModel)) {
      this._updateValue(this.model);
      this.viewModel = this.model;
    }
    */
  }
}