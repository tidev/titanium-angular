import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BaseWindow } from '@/shared/components/window.component';

@Component({
  templateUrl: 'search-view.component.html'
})
export class SearchViewComponent implements AfterViewInit {
  @ViewChild(BaseWindow) win: BaseWindow;
  @ViewChild('table') tableRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const search = Ti.UI.Android.createSearchView({
      hintText: 'Fruit'
    });

    const table = this.tableRef.nativeElement.titaniumView;
    table.search = search;

    const win = this.win.winRef.nativeElement.titaniumView;
    win.activity.onCreateOptionsMenu = e => {
      e.menu.add({
        title: 'Table Search',
        actionView: search,
        icon: Ti.App.Android.R.drawable.baseline_search_white_48,
        showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
      })
    }
  }
}
