import { Component,ElementRef, ViewChild } from "@angular/core";
import { findSingleVisualElementNoThrow, TitaniumElement } from 'titanium-vdom'

import { TableViewDataSource } from './table-view';

@Component({
  selector: 'table-view-section,TableViewSection',
  template: `
    <placeholder detached #headerViewContainer>
      <ng-content select="[headerView]"></ng-content>
    </placeholder>
    <ng-content></ng-content>
    <placeholder detached #footerViewContainer>
      <ng-content select="[footerView]"></ng-content>
    </placeholder>
  `,
  providers: [{ provide: TableViewDataSource, useExisting: TableViewSectionDirective }]
})
export class TableViewSectionDirective extends TableViewDataSource {
  private element: TitaniumElement<Titanium.UI.TableViewSection>;

  @ViewChild('headerViewContainer', { read: ElementRef, static: false }) headerViewRef: ElementRef

  @ViewChild('footerViewContainer', { read: ElementRef, static: false }) footerViewRef: ElementRef

  get titaniumView(): Titanium.UI.TableViewSection {
    return this.element.titaniumView;
  }

  constructor(el: ElementRef) {
    super();

    this.element = el.nativeElement;
  }

  ngAfterViewInit() {
    const headerElement = findSingleVisualElementNoThrow<Titanium.UI.View>(this.headerViewRef.nativeElement);
    const footerElement = findSingleVisualElementNoThrow<Titanium.UI.View>(this.footerViewRef.nativeElement);
    if (headerElement) {
      this.titaniumView.headerView = headerElement.titaniumView;
    }
    if (footerElement) {
      this.titaniumView.footerView = footerElement.titaniumView;
    }
  }

  get dataSource(): Titanium.UI.TableViewSection {
    return this.element.titaniumView;
  }
}
