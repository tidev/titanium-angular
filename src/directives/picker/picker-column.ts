import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList
} from '@angular/core';

import { PickerRowDirective } from './picker-row';

@Directive({
  selector: 'picker-column,PickerColumn'
})
export class PickerColumnDirective implements AfterContentInit {

  pickerColumn: Titanium.UI.PickerColumn;

  @ContentChildren(PickerRowDirective) rows: QueryList<PickerRowDirective>;

  constructor(el: ElementRef) {
      this.pickerColumn = el.nativeElement.titaniumView;
  }

  ngAfterContentInit() {
      this.rows.forEach(row => {
          this.pickerColumn.addRow(row.pickerRow);
      });
  }
}
