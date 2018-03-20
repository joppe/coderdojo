import { Injectable } from '@angular/core';
import { ModalComponent } from '@app/shared/modal/modal.component';

@Injectable()
export class ModalService {
    private modals: { [id: string]: ModalComponent } = {};

    public open(id: string): void {
        const modal: ModalComponent | undefined = this.find(id);

        if (modal !== undefined) {
            modal.isOpen = true;
        }
    }

    public close(id: string): void {
        const modal: ModalComponent | undefined = this.find(id);

        if (modal !== undefined) {
            modal.isOpen = false;
        }
    }

    public register(modal: ModalComponent): void {
        this.modals[modal.id] = modal;
    }

    private find(id: string): ModalComponent | undefined {
        return this.modals[id];
    }
}
