import { Directive, ElementRef, Optional, OnInit, OnDestroy } from "@angular/core";
import { TitaniumElement } from 'titanium-vdom'

import { TableViewDataSource } from './table-view';
import { TableViewSectionDirective } from "./table-view-section";

@Directive({
  selector: 'table-view-row,TableViewRow',
  providers: [{ provide: TableViewDataSource, useExisting: TableViewRowDirective }]
})
export class TableViewRowDirective extends TableViewDataSource {
  private element: TitaniumElement<Titanium.UI.TableViewRow>;

  constructor(el: ElementRef, @Optional() private parent: TableViewSectionDirective) {
    super();

    this.element = el.nativeElement;
  }

  get dataSource(): Titanium.UI.TableViewRow {
    return this.element.titaniumView;
  }
}
