import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  Input
} from '@angular/core';

import { PickerColumnDirective } from './picker-column';
import { PickerRowDirective } from './picker-row';

@Directive({
  selector: 'picker,Picker'
})
export class PickerDirective implements AfterContentInit {

  private picker: Titanium.UI.Picker;

  @ContentChildren(PickerRowDirective) rows: QueryList<PickerRowDirective>;

  @ContentChildren(PickerColumnDirective) columns: QueryList<PickerColumnDirective>;

  @Input()
  set type(value: number) {
    // @todo: create new picker proxy if changed after already rendered
    this.picker.type = value;
  }

  constructor(el: ElementRef) {
      this.picker = <Titanium.UI.Picker>el.nativeElement.titaniumView;
  }

  ngAfterContentInit() {
      const pickerData = [];

      if (this.columns.length >= 0) {
          this.columns.forEach(column => {
              pickerData.push(column.pickerColumn);
          });
      }

      if (this.rows.length >= 0) {
          this.rows.forEach(row => {
              pickerData.push(row.pickerRow);
          });
      }

      this.picker.add(pickerData);
  }
}
