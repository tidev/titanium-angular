import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';

import {
    findSingleVisualElement,
    InvisibleElement,
    TitaniumElement
} from 'titanium-vdom';

@Component({
    selector: 'scrollable-view,ScrollableView',
    template: `
        <DetachedView #container>
            <ng-content></ng-content>
        </DetachedView>
    `
})
export class ScrollableViewDirective implements AfterViewInit {

    @ViewChild('container', { read: ElementRef, static: false }) container: ElementRef

    scrollableView: Titanium.UI.ScrollableView;

    constructor(el: ElementRef) {
        this.scrollableView = el.nativeElement.titaniumView;
    }

    ngAfterViewInit() {
        const containerElement = this.container.nativeElement as TitaniumElement<Titanium.UI.View>;
        const views = [];

        for (const child of containerElement.children) {
            if (child instanceof TitaniumElement) {
                views.push(child.titaniumView)
            } else if (child instanceof InvisibleElement) {
                const visualElement = findSingleVisualElement(child);
                views.push(visualElement.titaniumView);
            }
        }

        this.scrollableView.views = views;
    }
}