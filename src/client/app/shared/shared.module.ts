import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OcticonDirective } from '@app/shared/octicon/octicon.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OcticonDirective
    ],
    exports: [
        OcticonDirective
    ]
})
export class SharedModule {
}
