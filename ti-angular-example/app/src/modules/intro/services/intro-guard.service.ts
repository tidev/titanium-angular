import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class IntroGuard implements CanActivate {

    private introShown: boolean = false;

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;

        if (this.introShown) {
            return true;
        }
        
        this.router.navigate(['/intro']);
        this.introShown = true;
        return false;
    }
}