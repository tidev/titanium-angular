import { Component, OnInit } from '@angular/core';

import { NavigationItem } from '@/shared/components/nav-table.component';

@Component({
    template: `
      <base-window title="Utility">
        <nav-table [items]="items" [prefix]="routePrefix"></nav-table>
      </base-window>
    `
})
export class UtilityViews implements OnInit {
  items: NavigationItem[];

  routePrefix = ['controls', 'utility'];

  ngOnInit() {
    this.items = [
      {
        id: 'progress-indicators',
        icon: 'spinner',
        title: 'Progress Indicators'
      }, {
        id: 'masked-image',
        icon: 'fill-drip',
        title: 'Masked Image'
      }, {
        id: 'refresh-control',
        icon: 'sync-alt',
        title: 'Refresh Control'
      }, {
        id: 'search-bar',
        icon: 'search',
        title: 'Search Bar'
      }, {
        id: 'button-bar',
        icon: 'minus',
        title: 'Button Bar'
      }, {
        id: 'toolbar',
        icon: 'clone',
        title: 'Toolbar'
      }
    ];
  }
}