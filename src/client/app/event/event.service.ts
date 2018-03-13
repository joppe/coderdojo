import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { IEvent } from '@app/event/event.interface';
import { IApiResponse } from '@app/service/api/api.response.interface';

type HandleErrorMethod = (error: HttpErrorResponse) => Observable<IApiResponse<undefined>>;

const httpOptions: { [name: string]: HttpHeaders } = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const BASE_URL: string = '/api/event';

@Injectable()
export class EventService {
    private http: HttpClient;

    public constructor(http: HttpClient) {
        this.http = http;
    }

    public getAll(): Observable<IApiResponse<undefined | IEvent[]>> {
        return this.http.get<IApiResponse<undefined | IEvent[]>>(BASE_URL, httpOptions).pipe(
            catchError(
                this.handleError(
                    'search',
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

export const eventServiceInjectables: Provider[] = [
    {
        provide: EventService,
        useClass: EventService
    }
];
