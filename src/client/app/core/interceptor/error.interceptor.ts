import {
    HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';

// tslint:disable-next-line no-import-side-effect
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // tslint:disable-next-line no-any
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            // tslint:disable-next-line no-any
            catchError((err: HttpErrorResponse): Observable<any> => {
                return Observable.throw(err.error);
            })
        );
    }
}

export const ErrorInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
