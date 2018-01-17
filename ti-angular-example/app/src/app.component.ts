import { 
    AfterViewInit,
    Component,
    AfterContentChecked,
    AfterViewChecked,
    ViewChild
} from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    AlertDialog,
    ConfirmDialog,
    AlertDialogDirective,
    ConfirmResult,
    TabGroupDirective,
    ListSectionDirective
} from 'titanium-angular';

@Component({
    selector: "ti-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

}