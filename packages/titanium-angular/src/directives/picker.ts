import {
    AfterContentInit,
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    QueryList
} from '@angular/core';

import {
    TitaniumElementNode
} from '../vdom';

@Directive({
    selector: 'PickerRow'
})
export class PickerRowDirective {
    element: TitaniumElementNode;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }
}

@Directive({
    selector: 'PickerColumn'
})
export class PickerColumnDirective implements AfterContentInit {
    element: TitaniumElementNode;

    @ContentChildren(PickerRowDirective) rows: QueryList<PickerRowDirective>;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngAfterContentInit() {
        this.rows.forEach(row => {
            this.element.titaniumView.addRow(row.element.titaniumView);
        });
    }
}

@Directive({
    selector: 'Picker'
})
export class PickerDirective implements AfterContentInit {

    private element: TitaniumElementNode;

    @ContentChildren(PickerRowDirective) rows: QueryList<PickerRowDirective>;

    @ContentChildren(PickerColumnDirective) columns: QueryList<PickerColumnDirective>;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngAfterContentInit() {
        const pickerData = [];

        if (this.columns.length >= 0) {
            this.columns.forEach(column => {
                pickerData.push(column.element.titaniumView);
            });
        }

        if (this.rows.length >= 0) {
            this.rows.forEach(row => {
                pickerData.push(row.element.titaniumView);
            });
        }

        this.element.titaniumView.add(pickerData);
    }

}