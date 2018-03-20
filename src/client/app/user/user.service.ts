import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { IApiResponse } from '@app/service/api/api.response.interface';
import { IUser } from '@app/user/user.interface';

type HandleErrorMethod = (error: HttpErrorResponse) => Observable<IApiResponse<undefined>>;

const httpOptions: { [name: string]: HttpHeaders } = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const BASE_URL: string = '/api/user';

@Injectable()
export class UserService {
    private http: HttpClient;

    public constructor(http: HttpClient) {
        this.http = http;
    }

    public getAll(): Observable<IApiResponse<undefined | IUser[]>> {
        return this.http.get<IApiResponse<undefined | IUser[]>>(BASE_URL, httpOptions).pipe(
            catchError(
                this.handleError(
                    'getAll',
                    {
                        data: undefined,
                        status: 500,
                        message: 'error'
                    }
                )
            )
        );
    }

    public get(id: string): Observable<IApiResponse<undefined | IUser>> {
        return this.http.get<IApiResponse<undefined | IUser>>(`${BASE_URL}/${id}`, httpOptions).pipe(
            catchError(
                this.handleError(
                    'getAll',
                    {
                        data: undefined,
                        status: 500,
                        message: 'error'
                    }
                )
            )
        );
    }

    public create(user: IUser): Observable<IApiResponse<undefined | IUser>> {
        return this.http.post<IApiResponse<undefined | IUser>>(BASE_URL, user, httpOptions).pipe(
            catchError(
                this.handleError(
                    'create',
                    {
                        data: undefined,
                        status: 500,
                        message: 'error'
                    }
                )
            )
        );
    }

    public update(id: string, user: Partial<IUser>): Observable<IApiResponse<undefined | IUser>> {
        return this.http.put<IApiResponse<undefined | IUser>>(`${BASE_URL}/${id}`, user, httpOptions).pipe(
            catchError(
                this.handleError(
                    'update',
                    {
                        data: undefined,
                        status: 500,
                        message: 'error'
                    }
                )
            )
        );
    }

    public remove(id: string): Observable<IApiResponse<undefined>> {
        return this.http.delete<IApiResponse<undefined>>(`${BASE_URL}/${id}`).pipe(
            catchError(
                this.handleError(
                    'create',
                    {
                        data: undefined,
                        status: 500,
                        message: 'error'
                    }
                )
            )
        );
    }

    private handleError(operation: string, result: IApiResponse<undefined>): HandleErrorMethod {
        return (error: HttpErrorResponse): Observable<IApiResponse<undefined>> => {
            result.message = `operation: ${operation}, message: ${error.message}`;

            return of(result);
        };
    }
}
