import { Component, ViewChild } from '@angular/core'
import {
    Logger,
    DeviceEnvironment,
    ListViewComponent as ListViewDirective,
    ListSectionDirective,
    WithTiGlobal
} from 'titanium-angular';

@Component({
    templateUrl: './list-view.component.html',
})
export class ListViewComponent extends WithTiGlobal() {

    @ViewChild(ListViewDirective, { static: false }) listView: ListViewDirective;

    @ViewChild('accessorySection', {read: ListSectionDirective, static: false}) accessorySection: ListSectionDirective;

    items: any[] = [
        {
            profileImage: {
                image: 'https://picsum.photos/200'
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
                image: 'https://picsum.photos/200'
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
        super();
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
}