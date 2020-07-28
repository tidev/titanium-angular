import { Component, OnInit } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

interface Card {
    id: number
    icon: string
    title: string,
    text: string
}

@Component({
    templateUrl: './scrollable-view.component.html'
})
export class ScrollableViewComponent extends WithTiGlobal() implements OnInit{

    cards: Card[];

    ngOnInit() {
        this.cards = [
            {
                id: 1,
                icon: 'angle-double-left',
                title: 'Step 1',
                text: 'Swipe left to continue'
            }, {
                id: 2,
                icon: 'fire',
                title: 'Step 2',
                text: 'Awesome, you got the concept'
            }, {
                id: 3,
                icon: 'thumbs-up',
                title: 'Step 3',
                text: 'That\'s it, now go back!'
            }
        ]
    }
}