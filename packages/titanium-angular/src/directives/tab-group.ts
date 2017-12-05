import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    TitaniumElementNode
} from '../vdom';

@Directive({
    selector: 'TabGroup'
})
export class TabGroupDirective {

    public tabGroup: TitaniumElementNode;

    private _selectedIndex: number;

    private viewInitialized: boolean;

    constructor(el: ElementRef) {
        this.tabGroup = el.nativeElement;
    }

    @Input()
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    addTab(tab: TabDirective) {
        this.tabGroup.titaniumView.addTab(tab.tab.titaniumView);
    }

    open() {
        this.tabGroup.titaniumView.open();
    }

}

@Directive({
    selector: 'Tab'
})
export class TabDirective implements OnInit {

    public tab: TitaniumElementNode;

    private owner: TabGroupDirective;

    constructor(el: ElementRef, owner: TabGroupDirective) {
        this.tab = el.nativeElement
        this.owner = owner;
    }

    ngOnInit() {
        if (this.tab.firstElementChild.nodeName !== 'Window') {
            throw new Error('The first child of a Tab always must be a Window');
        }

        const windowElement: TitaniumElementNode = <TitaniumElementNode>this.tab.firstElementChild;
        this.tab.titaniumView.setWindow(windowElement.titaniumView);
        this.owner.addTab(this);
    }

}