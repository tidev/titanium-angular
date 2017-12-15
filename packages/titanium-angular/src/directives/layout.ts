import {
    AfterContentInit,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';

import {
    ElementNode,
    TitaniumElement
} from '../vdom';

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