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
export class TabGroupDirective implements AfterViewInit {

    public tabGroup: TitaniumElementNode;

    private _selectedIndex: number;

    private viewInitialized: boolean;

    constructor(el: ElementRef) {
        console.log('new TabGroupDirective()');
        this.tabGroup = el.nativeElement;
    }

    @Input()
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    addTab(tab: TabDirective) {
        console.log(`Adding tab ${tab.tab.titaniumView.title}`);
        this.tabGroup.titaniumView.addTab(tab.tab.titaniumView);
    }

    open() {
        this.tabGroup.titaniumView.open();
    }

    ngAfterViewInit() {
        console.log('TabGroupDirective.ngAfterViewInit');
        
    }

}

@Directive({
    selector: 'Tab'
})
export class TabDirective implements OnInit {

    public tab: TitaniumElementNode;

    private owner: TabGroupDirective;

    constructor(el: ElementRef, owner: TabGroupDirective) {
        console.log('TabDirective.constructor');
        this.tab = el.nativeElement
        this.owner = owner;
    }

    ngOnInit() {
        if (this.tab.firstElementChild.nodeName !== 'Window') {
            throw new Error('The first child of a Tab always must be a Window');
        }

        const windowElement: TitaniumElementNode = <TitaniumElementNode>this.tab.firstElementChild;
        console.log(windowElement.titaniumView.apiName);
        this.tab.titaniumView.setWindow(windowElement.titaniumView);
        this.owner.addTab(this);
    }

}