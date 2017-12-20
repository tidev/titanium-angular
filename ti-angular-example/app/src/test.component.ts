import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'TestComponent',
    template: `
        <DetachedView backgroundColor="#03A9F4">
            <Label>{{text}}</Label>
        </DetachedView>
    `
})
export class TestComponent {
    @Input() text: string;
}