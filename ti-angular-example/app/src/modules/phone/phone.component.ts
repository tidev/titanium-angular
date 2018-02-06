import {
    AfterViewChecked,
    Component,
    ContentChildren,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';

import {
    TabDirective,
    ListSectionDirective,
    TitaniumRouter
} from 'titanium-angular';

@Component({
    selector: 'PhoneTab',
    templateUrl: 'phone.component.html'
})
export class PhoneComponent implements AfterViewChecked {

    @ViewChild(ListSectionDirective) section: ListSectionDirective;

    private router: TitaniumRouter;

    constructor(router: TitaniumRouter) {
        this.router = router;
    }

    ngAfterViewChecked() {
        this.styleListItems();
    }

    openItem(event) {
        this.router.navigate(['controls', event.itemId]).catch(e => Ti.API.error(e.message));
    }

    private styleListItems() {
        const listSectionProxy = this.section.listSection;
        const items = listSectionProxy.items
        for (let i = 0; i < items.length; i++) {
            const item = listSectionProxy.getItemAt(i);
            item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE;
            item.properties.color = '#000000';
            listSectionProxy.updateItemAt(i, item);
        }
    }
}