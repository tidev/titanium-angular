import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { InvisibleElement, TitaniumElement } from 'titanium-vdom';

@Component({
    selector: 'toolbar,Toolbar',
    template: `
        <DetachedView #container>
            <ng-content></ng-content>
        </DetachedView>
    `
})
export class ToolbarComponent implements AfterViewInit {
    @ViewChild('container') container: ElementRef

    toolbar: Titanium.UI.Toolbar;

    constructor(el: ElementRef) {
        this.toolbar = el.nativeElement.titaniumView;
    }

    ngAfterViewInit() {
        const containerElement = <InvisibleElement>this.container.nativeElement;
        const items = [];

        for (let element of containerElement.children) {
            if (element instanceof InvisibleElement) {
                element = element.firstVisualChild;
            }
            if (element instanceof TitaniumElement) {
                if (element.tagName !== 'BUTTON') {
                    throw new Error('Only Buttons are allowed as items in a Toolbar');
                }

                items.push(element.titaniumView);
            }
        }

        this.toolbar.items = items;
    }
}