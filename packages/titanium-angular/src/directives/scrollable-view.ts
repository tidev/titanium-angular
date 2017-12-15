import {
    AfterContentInit,
    Component,
    ElementRef,
    Host,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    AbstractAngularElement,
    InvisibleElement,
    ElementNode,
    TitaniumElement
} from '../vdom';

@Component({
    selector: 'ScrollableView',
    template: `
        <DetachedView #container>
            <ng-content></ng-content>
        </DetachedView>
    `
})
export class ScrollableViewDirective implements AfterContentInit {

    @ViewChild('container', { read: ElementRef }) container: ElementRef

    scrollView: any;
    
    constructor(el: ElementRef) {
        this.scrollView = el.nativeElement.titaniumView;
    }

    ngAfterContentInit() {
        const containerElement = this.container.nativeElement as TitaniumElement;
        const views = [];

        for (const child of this.container.nativeElement.children) {
            if (child instanceof TitaniumElement) {
                views.push(child.titaniumView)
            } else if (child instanceof InvisibleElement) {
                const visualElement = (<AbstractAngularElement>child).findSingleVisualElement(child);
                views.push(visualElement.titaniumView);
            }
        }

        this.scrollView.setViews(views);
    }
}