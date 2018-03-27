import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { LOCAL_STORAGE_CURRENT_USER_KEY } from '@app/core/config/local-storage-current-user.constant';
import { ILoggedinUser } from '@app/core/interface/loggedin-user.interface';

@Injectable()
export class AuthenticationService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public login(email: string, password: string): Observable<ILoggedinUser> {
        return this.http.post<ILoggedinUser>(
            '/api/login',
            {
                email: email,
                password: password
            }).pipe(
            map((user: ILoggedinUser): ILoggedinUser => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(
                        LOCAL_STORAGE_CURRENT_USER_KEY,
                        JSON.stringify(user)
                    );
                }

                return user;
            })
        );
    }

    public logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    }
}
