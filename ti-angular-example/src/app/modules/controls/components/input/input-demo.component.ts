import { Component, Input } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

@Component({
  selector: 'input-demo',
  templateUrl: 'input-demo.component.html'
})
export class InputDemo extends WithTiGlobal() {
  @Input() name: string
  @Input() hint = ''

  state = ''

  get info() {
    return this.state.length ? this.state : this.hint;
  }
}