import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivityIndicatorStyle } from 'titanium-angular';

@Component({
    templateUrl: './activity-indicator.component.html'
})
export class ActivityIndicatorComponent implements AfterViewInit {

    ActivityIndicatorStyle = ActivityIndicatorStyle;

    @ViewChildren('indicators') indicators: QueryList<ElementRef>;

    ngAfterViewInit() {
        this.indicators.forEach(indicatorRef => {
            const activityIndicator = <Titanium.UI.ActivityIndicator>indicatorRef.nativeElement.titaniumView;
            activityIndicator.show();
        });
    }

}