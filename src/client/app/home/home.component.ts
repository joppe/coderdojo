import { Component } from '@angular/core';

import { AlertService } from '@app/core/alert/alert.service';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private alertService: AlertService;
    private modalService: ModalService;

    constructor(alertService: AlertService,
                modalService: ModalService) {
        this.alertService = alertService;
        this.modalService = modalService;
    }

    public showModal(): void {
        this.modalService.open('home-dialog');
    }

    public successAlert(): void {
        this.alertService.success('Success!');
    }

    public errorAlert(): void {
        this.alertService.error('error');
    }
}
