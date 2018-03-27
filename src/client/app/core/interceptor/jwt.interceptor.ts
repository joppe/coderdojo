import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LOCAL_STORAGE_CURRENT_USER_KEY } from '@app/core/config/local-storage-current-user.constant';
import { ILoggedinUser } from '@app/core/interface/loggedin-user.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // tslint:disable-next-line no-any
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser: ILoggedinUser = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY)
        );

        if (currentUser && currentUser.token) {
            return next.handle(request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            }));
        }

        return next.handle(request);
    }
}

export const JwtInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};
