import { Injectable } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { IAlertMessage } from 'app/core/alert/alert-message.interface';

@Injectable()
export class AlertService {
    private subject: Subject<IAlertMessage> = new Subject<IAlertMessage>();
    private keepAfterNavigationChange: boolean = false;
    private router: Router;

    constructor(router: Router) {
        this.router = router;

        router.events.subscribe((event: Event): void => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.subject.next();
                }
            }
        });
    }

    public success(message: string, keepAfterNavigationChange: boolean = false): void {
        this.keepAfterNavigationChange = keepAfterNavigationChange;

        this.subject.next({
            type: 'success',
            text: message
        });
    }

    public error(message: string, keepAfterNavigationChange: boolean = false): void {
        this.keepAfterNavigationChange = keepAfterNavigationChange;

        this.subject.next({
            type: 'error',
            text: message
        });
    }

    public getMessage(): Observable<IAlertMessage> {
        return this.subject.asObservable();
    }
}
