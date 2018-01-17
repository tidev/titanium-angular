import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { Logger, DeviceEnvironment, ListViewComponent as ListViewDirective, ListSectionDirective } from 'titanium-angular';

@Component({
    templateUrl: './list-view.component.html'
})
export class ListViewComponent implements AfterViewInit {

    @ViewChild(ListViewDirective) listView: ListViewDirective;

    @ViewChild('systemTemplates', { read: ListSectionDirective }) systemTemplatesSection: ListSectionDirective;

    @ViewChild('accessory', { read: ListSectionDirective }) accessorySection: ListSectionDirective;

    items: any[] = [
        {
            title: {
                text: 'Nectarine'
            },
            detail: {
                text: '3'
            },
            template: 'MyCustomTemplate'
        }, {
            title: {
                text: 'Pear'
            },
            detail: {
                text: '7',
                color: 'green'
            },
            template: 'MyCustomTemplate'
        }
    ];

    constructor(private logger: Logger, private device: DeviceEnvironment) {

    }

    fetchData(event) {
        // You would usually fetch your remote data here
        setTimeout(() => {
            event.source.endRefreshing();
            this.logger.debug('Ti.UI.RefreshControl finished refreshing');
        }, 1000);
    }

    handleListViewClick(event) {
        this.logger.debug(`Ti.UI.ListView clicked cell at index ${event.sectionIndex} / ${event.itemIndex}`);
        if (this.device.runsIn('ios')) {
            this.listView.listView.deselectItem(event.sectionIndex, event.itemIndex);
        }
    }
    
    ngAfterViewInit() {
        const systemTemplatesSection: Titanium.UI.ListSection = this.systemTemplatesSection.element.titaniumView;
        let items = systemTemplatesSection.items;
        const systemTemplates = [
            Ti.UI.LIST_ITEM_TEMPLATE_DEFAULT,
            Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE,
            Ti.UI.LIST_ITEM_TEMPLATE_SETTINGS,
            Ti.UI.LIST_ITEM_TEMPLATE_CONTACTS
        ];
        for (let i = 0; i < items.length; i++) {
            items[i].template = systemTemplates[i];
            systemTemplatesSection.updateItemAt(i, items[i]);
        }

        const accessorySection: Titanium.UI.ListSection = this.accessorySection.element.titaniumView;
        items = accessorySection.items;
        const acessories = [
            Ti.UI.LIST_ACCESSORY_TYPE_NONE,
            Ti.UI.LIST_ACCESSORY_TYPE_DETAIL,
            Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
            Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
        ]
        for (let i = 0; i < items.length; i++) {
            items[i].properties.accessoryType = acessories[i];
            accessorySection.updateItemAt(i, items[i]);
        }
    }
}