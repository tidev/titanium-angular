import { AfterContentInit, Component, ElementRef, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { InvisibleElement, TitaniumElement, findSingleVisualElementNoThrow } from 'titanium-vdom';

@Component({
    selector: 'toolbar,Toolbar',
    template: `
        <DetachedView #container>
            <ng-content></ng-content>
        </DetachedView>
    `
})
export class ToolbarComponent implements AfterViewChecked {
    @ViewChild('container') container: ElementRef

    toolbar: Titanium.UI.Toolbar;

    constructor(el: ElementRef) {
        this.toolbar = el.nativeElement.titaniumView;
    }

    ngAfterViewChecked() {
        const containerElement = <InvisibleElement>this.container.nativeElement;
        const items = [];

        for (let element of containerElement.children) {
            if (element instanceof InvisibleElement) {
                element = element.firstVisualChild;
            }
            if (element instanceof TitaniumElement) {
                if (element.nodeName !== 'Button') {
                    throw new Error('Only Buttons are allowed as items in a Toolbar');
                }

                items.push(element.titaniumView);
            }
        }

        this.toolbar.items = items;
    }
}