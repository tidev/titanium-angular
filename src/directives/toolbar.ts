import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';

import { InvisibleElement, TitaniumElement } from '../vdom';

@Component({
    selector: 'Toolbar',
    template: `
        <DetachedView #container>
            <ng-content></ng-content>
        </DetachedView>
    `
})
export class ToolbarComponent implements AfterContentInit {
    @ViewChild('container', { read: ElementRef }) container: ElementRef

    toolbar: Titanium.UI.Toolbar;

    constructor(el: ElementRef) {
        this.toolbar = el.nativeElement.titaniumView;
    }

    ngAfterContentInit() {
        const containerElement = <InvisibleElement>this.container.nativeElement;
        console.log('ToolbarComponent.ngAfterContentInit ' + containerElement.constructor.name);
        console.log('ToolbarComponent.ngAfterContentInit ' + containerElement.children.length);
        const items = [];

        for (let itemElement of containerElement.children) {
            if (itemElement instanceof TitaniumElement) {
                if (itemElement.nodeName !== 'Button') {
                    throw new Error('Only Buttons are allowed as items in a Toolbar');
                }

                itemElement.remove();
                items.push(itemElement.titaniumView);
            }
        }

        this.toolbar.items = items;
    }
}