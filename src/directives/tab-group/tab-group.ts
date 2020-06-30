import { Directive, ElementRef, Input } from '@angular/core';

import { DeviceEnvironment } from '../../services';

@Directive({
  selector: 'tab-group,TabGroup'
})
export class TabGroupDirective {

  private tabGroup: Titanium.UI.TabGroup;

  private _selectedTab = 0;

  constructor(el: ElementRef, private device: DeviceEnvironment) {
    console.log('tabgroup create');
    this.tabGroup = el.nativeElement.titaniumView;
  }

  get selectedTab(): number {
    return this._selectedTab;
  }

  @Input()
  set selectedTab(index) {
    this._selectedTab = index;
    this.tabGroup.activeTab = this.tabGroup.tabs[index];
  }

  get titaniumView(): Titanium.UI.TabGroup {
    return this.tabGroup;
  }

  addTab(tab: Titanium.UI.Tab) {
    this.tabGroup.addTab(tab);
    const numberOfTabs = this.tabGroup.tabs.length;
    if (numberOfTabs > 1 && this.device.runs('ios')) {
      // FIXME: We need to switch the active tab once after adding additional
      // tabs to keep the currently active tab highlighted in the tab bar.
      this.tabGroup.activeTab = this.tabGroup.tabs[numberOfTabs -1];
      this.tabGroup.activeTab = this.selectedTab;
    }
  }

  removeTab(tab: Titanium.UI.Tab) {
      this.tabGroup.removeTab(tab);
  }

}