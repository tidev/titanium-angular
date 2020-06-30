import {
  Directive,
  Host,
  Input,
  TemplateRef
} from '@angular/core';

import { ListViewComponent } from './list-view';

@Directive({
  selector: '[tiTemplateName],[ti-template-name]'
})
export class ListItemTemplateDirective {

  private templateRef: TemplateRef<any>;

  private listView: ListViewComponent;

  constructor(templateRef: TemplateRef<any>, @Host() listView: ListViewComponent) {
      this.templateRef = templateRef;
      this.listView = listView;
  }

  @Input()
  set tiTemplateName(name: string) {
      if (this.listView && this.templateRef) {
          this.listView.registerTemplate(name, this.templateRef);
      }
  }
}
