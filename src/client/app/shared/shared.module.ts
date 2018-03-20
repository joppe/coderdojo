import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from '@app/shared/header/header.component';
import { ModalComponent } from '@app/shared/modal/modal.component';
import { ModalService } from '@app/shared/modal/modal.service';
import { OcticonDirective } from '@app/shared/octicon/octicon.directive';
import { DateFormatService } from '@app/shared/service/date-format.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        ModalComponent,
        OcticonDirective
    ],
    exports: [
        HeaderComponent,
        ModalComponent,
        OcticonDirective
    ],
    providers: [
        DateFormatService,
        ModalService
    ]
})
export class SharedModule {
}
