import { Directive, ElementRef, OnInit } from '@angular/core';
import { TitaniumElement } from 'titanium-vdom';

@Directive({
    selector: 'navigation-window,NavigationWindow'
})
export class NavigationWindowDirective implements OnInit {

    private element: TitaniumElement<Titanium.UI.NavigationWindow>;

    constructor(el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        const windowElement = <TitaniumElement<Titanium.UI.Window>>this.element.firstElementChild;
        if (!windowElement || windowElement.nodeName !== 'Window') {
            throw new Error('The first child of a NavigationWindow always must be a Window');
        }

        this.element.setAttribute('window', windowElement.titaniumView);
    }

}