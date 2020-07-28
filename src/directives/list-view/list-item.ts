import {
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { InvisibleElement } from 'titanium-vdom';

import { ListSectionDirective } from './list-section';

/**
 * A list item within a list section
 *
 * Since this does not map to a Titanium proxy that would update itself
 * on attribute changes, we use input properties and listen for changes
 * on the ListItem elements in the list section directive.
 */
@Directive({
  selector: 'list-item,ListItem'
})
export class ListItemDirective implements OnChanges {
  public element: InvisibleElement;

  @Input() accessoryType: number;

  @Input() canEdit: boolean;

  @Input() canInsert: boolean;

  @Input() canMove: boolean;

  @Input() color: string;

  @Input() editActions: RowActionType[];

  @Input() font: Font;

  @Input() height: number | string;

  @Input() image: string;

  @Input() itemId: boolean;

  @Input() searchableText: string;

  @Input() selectedBackgroundColor: string;

  @Input() selectedBackgroundGradient: Gradient;

  @Input() selectedBackgroundImage: string;

  @Input() selectedColor: string;

  @Input() selectedSubtitleColor: string;

  @Input() selectionStyle: string;

  @Input() subtitle: string;

  @Input() subtitleColor: string;

  @Input() template: number;

  @Input() title: string;

  private owner: ListSectionDirective;

  private itemProperties: object = {};

  private customProperties: object = {};

  constructor(el: ElementRef, @Inject(forwardRef(() => ListSectionDirective)) owner: ListSectionDirective) {
      this.element = el.nativeElement;
      this.owner = owner;
  }

  get dataItem(): ListDataItem {
      const dataItem: ListDataItem = {
          template: this.template || Titanium.UI.LIST_ITEM_TEMPLATE_DEFAULT,
          properties: this.itemProperties
      }
      return dataItem;
  }

  ngOnChanges(changes: SimpleChanges) {
      for (let changedPropertyName in changes) {
          if (changedPropertyName === 'template') {
              continue;
          }
          const change = changes[changedPropertyName];
          this.itemProperties[changedPropertyName] = change.currentValue;
      }

      this.owner.updateListItem(this);
  }
}