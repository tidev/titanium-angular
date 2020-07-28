import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  forwardRef,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  QueryList,
  TrackByFunction
} from '@angular/core';

import { ListViewComponent } from './list-view';
import { ListItemDirective } from './list-item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'list-section,ListSection',
  template: `<ng-content></ng-content>`
})
export class ListSectionDirective implements AfterContentInit, DoCheck {

  public listSection: Titanium.UI.ListSection;

  @ContentChildren(forwardRef(() => ListItemDirective)) contentItems: QueryList<ListItemDirective>;

  @Input()
  set items(items: ListDataItem[]) {
    this._items = items
    this._itemsDirty = true;
  }

  @Input()
  set itemTrackBy(fn: TrackByFunction<ListDataItem>) {
    this._trackByFn = fn;
  }

  get itemTrackBy() { return this._trackByFn; }

  private _items: Array<ListDataItem>;

  private _itemsDirty = true;

  private _trackByFn!: TrackByFunction<ListDataItem>;

  private owner: ListViewComponent;

  private _itemDiffer: IterableDiffer<ListDataItem> | null = null;

  constructor(el: ElementRef, owner: ListViewComponent, private _iterableDiffers: IterableDiffers) {
      this.listSection = el.nativeElement.titaniumView;
      this.owner = owner;
  }

  ngAfterContentInit() {
      this.updateContentListItems();

      this.owner.appendSection(this.listSection);

      this.contentItems.changes.subscribe(changes => {
          for (let changedPropertyName in changes) {
              // @todo check for changed items?
          }
      });
  }

  ngDoCheck(): void {
    if (this._itemsDirty) {
        this._itemsDirty = false;
        const value = this._items;
        if (!this._itemDiffer && value) {
            this._itemDiffer = this._iterableDiffers.find(value).create(this.itemTrackBy);
        }
    }

    if (this._itemDiffer) {
        const changes = this._itemDiffer.diff(this._items);
        if (changes) {
            this.applyItemChanges(changes);
        }
    }
  }

  updateListItem(item: ListItemDirective) {
      if (!this.contentItems) {
          return;
      }

      let itemIndex = null;
      this.contentItems.find((element, index, array) => {
          if (element.dataItem === item.dataItem) {
              itemIndex = index;
              return true;
          }

          return false;
      });

      this.listSection.updateItemAt(itemIndex, item.dataItem);
  }

  private applyItemChanges(changes: IterableChanges<ListDataItem>) {
      changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
          if (item.previousIndex === null) {
            this.listSection.insertItemsAt(currentIndex, [item.item]);
          } else if (currentIndex === null) {
            this.listSection.deleteItemsAt(adjustedPreviousIndex, 1);
          } else if (adjustedPreviousIndex !== null) {
            this.listSection.deleteItemsAt(adjustedPreviousIndex, 1);
            this.listSection.insertItemsAt(currentIndex, [item.item]);
          }
      });
  }

  private updateContentListItems() {
      if (this.contentItems.length > 0) {
          this.listSection.items = this.contentItems.map(listItem => listItem.dataItem);
      }
  }
}
