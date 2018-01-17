import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';

import {
    TabDirective,
    ListItemDirective,
    TitaniumRouter
} from 'titanium-angular';

@Component({
    selector: 'ControlsTab',
    templateUrl: 'controls.component.html'
})
export class ControlsComponent implements AfterViewInit {

    @ViewChild(TabDirective) tab: TabDirective;

    @ViewChildren(ListItemDirective) items: QueryList<ListItemDirective>;

    private router: TitaniumRouter;

    constructor(router: TitaniumRouter) {
        this.router = router;
    }

    ngAfterViewInit() {
        console.log('ControlsComponent.ngAfterViewInit');
        this.items.forEach(item => {
            item.element.setAttribute('accessoryType', Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE);
        });
    }

    openItem(event) {
        this.router.navigate(['controls', event.itemId]).catch(e => Ti.API.error(e.message));
    }
}