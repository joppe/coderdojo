import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { IAlertMessage } from 'app/core/alert/alert-message.interface';
import { AlertService } from 'app/core/alert/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnDestroy {
    public message: IAlertMessage;

    private subscription: Subscription;
    private alertService: AlertService;

    constructor(alertService: AlertService) {
        this.alertService = alertService;

        this.subscription = alertService.getMessage().subscribe((message: IAlertMessage): void => {
            this.message = message;
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public close(): void {
        this.message = undefined;
    }
}
