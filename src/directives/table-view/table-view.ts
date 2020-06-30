import {
  AfterContentChecked,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
} from '@angular/core';
import { TitaniumElement } from 'titanium-vdom'

export abstract class TableViewDataSource {
  abstract get dataSource(): Titanium.UI.TableViewRow | Titanium.UI.TableViewSection
}

@Directive({
  selector: 'table-view,TableView'
})
export class TableViewDirective implements AfterContentChecked {
  private tableView: Ti.UI.TableView

  @ContentChildren(TableViewDataSource)
  private children: QueryList<TableViewDataSource>

  constructor(el: ElementRef) {
    this.tableView = el.nativeElement.titaniumView;
  }

  ngAfterContentChecked() {
    if (this.children && this.children.length) {
      const data = (this.children.map(rowOrSection => rowOrSection.dataSource)) as any;
      this.tableView.data = data;
    }
  }

  // @TODO: make use of iterable differs to add/remove rows/section on
  // subsequent content changes
}
