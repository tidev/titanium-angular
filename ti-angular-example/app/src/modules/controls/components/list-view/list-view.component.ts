import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import {
    Logger,
    DeviceEnvironment,
    ListAccessoryType,
    ListViewComponent as ListViewDirective,
    ListSectionDirective
} from 'titanium-angular';

@Component({
    templateUrl: './list-view.component.html'
})
export class ListViewComponent implements AfterViewInit {

    ListAccessoryType = ListAccessoryType;

    @ViewChild(ListViewDirective) listView: ListViewDirective;

    @ViewChild('accessorySection', {read: ListSectionDirective}) accessorySection: ListSectionDirective;

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

    ngAfterViewInit() {
        this.styleListItems();
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
        if (this.device.runs('ios')) {
            this.listView.listView.deselectItem(event.sectionIndex, event.itemIndex);
        }
    }

    private styleListItems() {
        const listSectionProxy = this.accessorySection.listSection;
        const items = listSectionProxy.items
        for (let i = 0; i < items.length; i++) {
            const item = listSectionProxy.getItemAt(i);
            item.properties.color = '#000000';
            listSectionProxy.updateItemAt(i, item);
        }
    }
}