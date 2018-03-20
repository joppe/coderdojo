import { Component } from '@angular/core';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private modalService: ModalService;

    constructor(modalService: ModalService) {
        this.modalService = modalService;
    }

    public showModal(): void {
        this.modalService.open('home-dialog');
    }
}
