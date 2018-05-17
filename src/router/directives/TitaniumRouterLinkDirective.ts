import { Directive, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { Logger } from '../../log';
import { NavigationTransition, TransitionType } from '../../animation';
import { capitalizeFirstLetter } from '../../utility/string';
import { TitaniumNavigationOptions, TitaniumRouter } from '../TitaniumRouter';

@Directive({
    selector: '[tiRouterLink]'
})
export class TitaniumRouterLinkDirective {

    @Input() queryParams: { [k: string]: any };
    @Input() fragment: string;

    @Input() transition: boolean | string | NavigationTransition = false;

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
        const options: TitaniumNavigationOptions = {
            queryParams: this.queryParams,
            fragment: this.fragment,
            transition: this.convertTransition()
        };
        this.titaniumRouter.navigateByUrl(this.urlTree, options)
            .catch(e => {
                this.logger.error(e.message);
            });
    }

    private convertTransition(): NavigationTransition {
        if (typeof this.transition === 'boolean') {
            return {
                type: this.transition ? TransitionType.SlideLeft : TransitionType.None
            }
        } else if (typeof this.transition === 'string') {
            const enumMemberName = capitalizeFirstLetter(this.transition);
            if (!TransitionType[enumMemberName]) {
                throw new Error(`Invalid transition string specified. Valid transitions are: ${Object.keys(TransitionType).map(t => TransitionType[t]).join(', ')}`);
            }

            return {
                type: TransitionType[enumMemberName]
            }
        } else {
            return this.transition;
        }
    }

}