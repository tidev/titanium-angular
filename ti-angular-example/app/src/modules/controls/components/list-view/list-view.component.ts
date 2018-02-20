import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import {
    Logger,
    DeviceEnvironment,
    ListAccessoryType,
    ListItemTemplate,
    ListViewComponent as ListViewDirective,
    ListSectionDirective
} from 'titanium-angular';

@Component({
    templateUrl: './list-view.component.html',
})
export class ListViewComponent implements AfterViewInit {

    ListAccessoryType = ListAccessoryType;

    ListItemTemplate = ListItemTemplate;

    @ViewChild(ListViewDirective) listView: ListViewDirective;

    @ViewChild('accessorySection', {read: ListSectionDirective}) accessorySection: ListSectionDirective;

    items: any[] = [
        {
            profileImage: {
                image: 'http://via.placeholder.com/50x50/1976d2/ffffff'
            },
            name: {
                text: 'Daisy Rey',
                font: {
                    fontWeight: 'bold'
                }
            },
            preview: {
                text: 'Can\'t wait to see you! \uE056'
            },
            time: {
                color: 'black',
                text: '21:42',
                font: {
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            },
            newMessagesBadgeText: {
                text: '1',
                font: {
                    fontSize: '12'
                }
            },
            template: 'ComponentTemplate'
        }, {
            profileImage: {
                image: 'http://via.placeholder.com/50x50/1976d2/ffffff'
            },
            name: {
                text: 'Frank',
                font: {
                    fontWeight: 'bold'
                }
            },
            preview: {
                text: '28 days, 6 hours, 42 minutes, 12 seconds'
            },
            time: {
                text: '20:15',
                font: {
                    fontSize: '12'
                }
            },
            newMessagesBadge: {
                visible: false
            },
            template: 'ComponentTemplate'
        }, {
            title: {
                text: 'Pear'
            },
            detail: {
                text: '7',
                color: 'green'
            },
            template: 'InlineTemplate'
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