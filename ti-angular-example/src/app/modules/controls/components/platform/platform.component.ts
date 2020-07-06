import { Component, OnInit } from '@angular/core';
import { WithTiGlobal, DeviceEnvironment } from 'titanium-angular';

import { NavigationItem } from '@/shared/components/nav-table.component'

@Component({
  selector: 'PlatformComponent',
  templateUrl: './platform.component.html'
})
export class PlatformComponent extends WithTiGlobal() implements OnInit  {

  items: NavigationItem[];

  routePrefix = ['controls', 'platform'];

  constructor(private device: DeviceEnvironment) {
    super();
  }

  ngOnInit() {
    if (this.device.runs('android')) {
      this.items = [
        {
          id: 'card-view',
          icon: 'square',
          title: 'Card View'
        },
        {
          id: 'progress-indicator',
          icon: 'spinner',
          title: 'Progress Indicator'
        },
        {
          id: 'search-view',
          icon: 'search',
          title: 'Search View'
        }
      ]
    } else {
      this.items = [
        {
          id: 'blur-view',
          icon: 'magic',
          title: 'Blur View'
        }, {
          id: 'live-photo',
          icon: 'image',
          title: 'Live Photo'
        }, {
          id: 'stepper',
          icon: 'sort',
          title: 'Stepper'
        }
      ]
    }
  }
}