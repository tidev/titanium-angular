import {
  AfterContentInit,
  Directive,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { findSingleVisualElement, TitaniumElement } from 'titanium-vdom';

import { TabGroupDirective } from './tab-group';

@Directive({
  selector: 'tab,Tab'
})
export class TabDirective implements AfterContentInit, OnDestroy {

  public element: TitaniumElement<Titanium.UI.Tab>;

  private tab: Titanium.UI.Tab;

  private owner: TabGroupDirective;

  constructor(el: ElementRef, owner: TabGroupDirective) {
      this.element = el.nativeElement;
      this.tab = this.element.titaniumView;
      this.owner = owner;
  }

  ngAfterContentInit() {
      const candidateElement = this.element.firstElementChild;
      const windowElement = <TitaniumElement<Ti.UI.Window>>findSingleVisualElement(candidateElement);
      if (windowElement.nodeName !== 'Window') {
          throw new Error('The first child of a Tab always must be a Window');
      }

      this.tab.window = windowElement.titaniumView;
      this.owner.addTab(this.tab);
  }

  ngOnDestroy() {
    this.owner.removeTab(this.tab);
  }
}