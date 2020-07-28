import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListViewComponent } from 'titanium-angular';

@Component({
  templateUrl: 'search-bar.component.html'
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  names = [
    'Sebastian',
    'Alexandra',
    'Alexej',
    'Nina',
    'Tobi'
  ]

  items = []

  @ViewChild(ListViewComponent) listView: ListViewComponent

  ngOnInit() {
    this.items = this.names.map(name => {
      return {
        name: { text: name },
        properties: {
          searchableText: name
        }
      }
    });
  }

  ngAfterViewInit() {
    const listView = this.listView.listView
    listView.searchView = Ti.UI.createSearchBar();
  }
}