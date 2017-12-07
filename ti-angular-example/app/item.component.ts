import {
    Component
} from '@angular/core';

@Component({
    selector: 'ItemComponent',
    template: `
        <Label bindId="name" top="10" left="10"></Label>
    `
})
export class ItemComponent {

}