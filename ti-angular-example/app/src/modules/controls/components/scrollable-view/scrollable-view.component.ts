import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { ScrollableViewDirective } from 'titanium-angular';

@Component({
    templateUrl: './scrollable-view.component.html'
})
export class ScrollableViewComponent implements AfterViewInit {

    @ViewChild(ScrollableViewDirective) scrollableView: ScrollableViewDirective;

    private selectedPage: number = 0;

    ngAfterViewInit() {
        this.scrollableView.titaniumView.currentPage = this.selectedPage;
    }

    scrollableViewDidScroll(event) {
        Ti.API.debug(`ScrollView scrolled to page ${event.currentPage}`);
        this.selectedPage = event.currentPage;
    }
}