import {
    AfterContentInit,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';

import {
    ElementNode,
    TitaniumElementNode
} from '../vdom';

@Component({
    selector: 'HorizontalLayout',
    template: `
        <View #layoutView layout="horizontal">
            <ng-content></ng-content>
        </View>
    `
})
export class HorizontalLayout implements AfterContentInit {

    element: ElementNode;

    @ViewChild('layoutView') view: ElementRef;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngAfterContentInit() {
        this.element.parentElement.appendChild(this.view.nativeElement);
    }
}

@Component({
    selector: 'VerticalLayout',
    template: `
        <View #layoutView layout="vertical">
            <ng-content></ng-content>
        </View>
    `
})
export class VerticalLayout implements AfterContentInit {

    element: ElementNode;

    @ViewChild('layoutView') view: ElementRef;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }
    
    ngAfterContentInit() {
        this.element.parentElement.appendChild(this.view.nativeElement);
    }
}