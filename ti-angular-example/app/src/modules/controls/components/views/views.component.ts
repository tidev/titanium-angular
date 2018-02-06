import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { ListSectionDirective, TitaniumRouter } from 'titanium-angular';

@Component({
    templateUrl: './views.component.html'
})
export class ViewsComponent implements AfterViewInit {

    @ViewChild(ListSectionDirective) section: ListSectionDirective;

    constructor(private router: TitaniumRouter, private route: ActivatedRoute) {
        
    }

    ngAfterViewInit() {
        this.styleListItems();
    }

    openItem(event) {
        this.router.navigate([event.itemId], { relativeTo: this.route }).catch(e => Ti.API.error(e.message));
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