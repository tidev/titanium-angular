import { Directive, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { Logger } from '../../log';
import { TitaniumRouter } from '../TitaniumRouter';

@Directive({
    selector: '[tiRouterLink]'
})
export class TitaniumRouterLinkDirective {

    @Input() target: string;
    @Input() queryParams: { [k: string]: any };
    @Input() fragment: string;

    private router: Router;
    private titaniumRouter: TitaniumRouter;
    private route: ActivatedRoute;
    private logger: Logger;
    private commands: any[] = [];

    constructor(router: Router, titaniumRouter: TitaniumRouter, route: ActivatedRoute, logger: Logger) {
        this.router = router;
        this.titaniumRouter = titaniumRouter;
        this.route = route;
        this.logger = logger;
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
    onClick(): void {
        const extras = {
            // @todo: Figure what extras we need
        };
        this.titaniumRouter.navigateByUrl(this.urlTree, extras)
            .catch(e => {
                this.logger.error(e.message);
            });
    }

}