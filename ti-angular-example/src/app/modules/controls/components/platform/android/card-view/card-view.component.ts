import { Component } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

@Component({
  templateUrl: './card-view.component.html'
})
export class CardViewComponent extends WithTiGlobal() {
  items = new Array(10)
}
