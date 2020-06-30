import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListViewComponent } from 'titanium-angular';

@Component({
  templateUrl: 'search-bar.component.html'
})
export class SearchBarComponent implements OnInit, AfterViewChecked {
  names = [
    'Sebastian',
    'Alexandra',
    'Alexej',
    'Nina',
    'Tobi'
  ]

  items = []

  @ViewChild(ListViewComponent) listView: ListViewComponent

  private tiListView?: Ti.UI.ListView

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

  ngAfterViewChecked() {
    if (this.listView.listView !== this.tiListView) {
      this.tiListView = this.listView.listView
      this.tiListView.searchView = Ti.UI.createSearchBar();
    }
  }
}