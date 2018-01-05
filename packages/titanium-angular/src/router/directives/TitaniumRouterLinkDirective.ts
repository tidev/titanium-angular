import {
    Directive,
    HostListener,
    Input
} from '@angular/core';

import {
    ActivatedRoute,
    Router,
    UrlTree
} from '@angular/router';

@Directive({
    selector: '[tiRouterLink]'
})
export class TitaniumRouterLinkDirective {

    @Input() target: string;
    @Input() queryParams: { [k: string]: any };
    @Input() fragment: string;

    private router: Router;
    private route: ActivatedRoute;
    private commands: any[] = [];

    constructor(router: Router, route: ActivatedRoute) {
        this.router = router;
        this.route = route;
    }

    @Input()
    set tiRouterLink(commands: any[] | string) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        } else {
            this.commands = [];
        }
    }

    get urlTree(): UrlTree {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment
        });
    }

    @HostListener('click')
    onClick(): boolean {
        const extras = {
            // @todo: Figure what extras we need
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    }

}