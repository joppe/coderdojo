import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LOCAL_STORAGE_CURRENT_USER_KEY } from '@app/core/config/local-storage-current-user.constant';
import { RETURN_URL_QUERY_PARAM } from '@app/login/login.component';

@Injectable()
export class AuthGuard implements CanActivate {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY)) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(
            [
                '/login'
            ],
            {
                [RETURN_URL_QUERY_PARAM]: {
                    returnUrl: state.url
                }
            });

        return false;
    }
}
