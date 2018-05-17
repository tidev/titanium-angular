import { Directive, ElementRef, OnInit } from '@angular/core';

import { TitaniumElement } from '../vdom';

@Directive({
    selector: 'NavigationWindow'
})
export class NavigationWindowDirective implements OnInit {

    private element: TitaniumElement;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        const windowElement = <TitaniumElement>this.element.firstElementChild;
        if (!windowElement || windowElement.nodeName !== 'Window') {
            throw new Error('The first child of a NavigationWindow always must be a Window');
        }

        this.element.setAttribute('window', windowElement.titaniumView);
    }

}