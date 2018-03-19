import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OcticonDirective } from '@app/shared/octicon/octicon.directive';
import { DateFormatService } from '@app/shared/service/date-format.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OcticonDirective
    ],
    exports: [
        OcticonDirective
    ],
    providers: [
        DateFormatService
    ]
})
export class SharedModule {
}
