import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'refresh-control,RefreshControl'
})
export class RefreshControlDirective {

  public refreshControl: Titanium.UI.RefreshControl;

  constructor(el: ElementRef) {
      this.refreshControl = el.nativeElement.titaniumView;
  }
}
