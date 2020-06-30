import { Component, OnInit } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

import { NavigationItem } from '@/shared/components/nav-table.component'

@Component({
  selector: 'ControlsTab',
  templateUrl: 'controls.component.html'
})
export class ControlsComponent extends WithTiGlobal() implements OnInit  {

  items: NavigationItem[];

  routePrefix = ['controls'];

  ngOnInit() {
    this.items = [
      {
        id: 'views',
        icon: 'layer',
        title: 'Structural Views'
      }, {
        id: 'inputs',
        icon: 'clipboard-list',
        title: 'Input Elements'
      }, {
        id: 'utility',
        icon: 'cogs',
        title: 'Utility Views'
      }, {
        id: 'platform',
        icon: 'flask',
        title: 'Platform'
      }, {
        id: 'dialogs',
        icon: 'clone',
        title: 'Dialogs'
      }
    ]
  }
}