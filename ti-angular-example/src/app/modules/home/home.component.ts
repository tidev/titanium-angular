import {
    Component,
    ViewChild
} from '@angular/core';

@Component({
    templateUrl: "./home.component.html"
})
export class HomeComponent {
    logClick() {
        console.log('clicked')
    }
}