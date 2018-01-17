import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { TitaniumRouter } from 'titanium-angular';

@Component({
    templateUrl: './views.component.html'
})
export class ViewsComponent {

    constructor(private router: TitaniumRouter, private route: ActivatedRoute) {
        
    }

    openItem(event) {
        this.router.navigate([event.itemId], { relativeTo: this.route }).catch(e => Ti.API.error(e.message));
    }
}