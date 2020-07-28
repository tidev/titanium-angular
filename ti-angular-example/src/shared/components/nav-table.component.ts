import { Component, Input } from '@angular/core';
import { DeviceEnvironment, TitaniumRouter, WithTiGlobal } from 'titanium-angular';

export interface NavigationItem {
  id: string
  icon: string,
  iconStyle?: string
  title: string
}

@Component({
  selector: 'nav-table',
  templateUrl: 'nav-table.component.html'
})
export class NavTable extends WithTiGlobal() {
  @Input() prefix: string[];

  @Input() items: NavigationItem[];

  constructor(private router: TitaniumRouter, private device: DeviceEnvironment) {
    super();
  }

  get hasChild() {
    return this.device.runs('android') ? false : true
  }

  onItemClick(e) {
    this.router.navigate([...this.prefix, this.items[e.index].id]);
  }
}