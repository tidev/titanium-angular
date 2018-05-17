import {
    AfterContentInit,
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    QueryList
} from '@angular/core';

import {
    TitaniumElement
} from '../vdom';

@Directive({
    selector: 'PickerRow'
})
export class PickerRowDirective {
    pickerRow: Titanium.UI.PickerRow;

    constructor(el: ElementRef) {
        this.pickerRow = el.nativeElement.titaniumView;
    }
}

@Directive({
    selector: 'PickerColumn'
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

@Directive({
    selector: 'Picker'
})
export class PickerDirective implements AfterContentInit {

    private picker: Titanium.UI.Picker;

    @ContentChildren(PickerRowDirective) rows: QueryList<PickerRowDirective>;

    @ContentChildren(PickerColumnDirective) columns: QueryList<PickerColumnDirective>;

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