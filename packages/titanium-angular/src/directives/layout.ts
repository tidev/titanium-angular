import {
    AfterContentInit,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'HorizontalLayout',
    template: `
        <View layout="horizontal">
            <ng-content></ng-content>
        </View>
    `
})
export class HorizontalLayoutComponent {
    
}

@Component({
    selector: 'VerticalLayout',
    template: `
        <View layout="vertical">
            <ng-content></ng-content>
        </View>
    `
})
export class VerticalLayoutComponent {
    
}