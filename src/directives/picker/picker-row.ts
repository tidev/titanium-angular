import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'picker-row,PickerRow'
})
export class PickerRowDirective {
  pickerRow: Titanium.UI.PickerRow;

  constructor(el: ElementRef) {
      this.pickerRow = el.nativeElement.titaniumView;
  }
}
