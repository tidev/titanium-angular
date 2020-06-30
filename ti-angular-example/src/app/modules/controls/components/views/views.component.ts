import { Component, OnInit } from '@angular/core';

import { NavigationItem } from '@/shared/components/nav-table.component';
import { DeviceEnvironment } from 'titanium-angular';

@Component({
    templateUrl: './views.component.html'
})
export class ViewsComponent implements OnInit {
  items: NavigationItem[];

  routePrefix = ['controls', 'views'];

  constructor(private device: DeviceEnvironment) {}

  ngOnInit() {
    this.items = [
      {
        id: 'view',
        icon: 'layer',
        title: 'View'
      },
      {
        id: 'image-view',
        icon: 'image',
        title: 'Image View'
      },
      {
        id: 'list-view',
        icon: 'list',
        title: 'List View'
      },
      {
        id: 'table-view',
        icon: 'list-alt',
        title: 'Table View'
      },
      {
        id: 'scroll-view',
        icon: 'arrows-alt-v',
        title: 'Scroll View'
      },
      {
        id: 'scrollable-view',
        icon: 'elipsis-h',
        title: 'Scrollable View'
      },
      {
        id: 'web-view',
        icon: this.device.runs('ios') ? 'safari' : 'chrome',
        iconStyle: 'brands',
        title: 'Web View'
      }
    ];
  }
}