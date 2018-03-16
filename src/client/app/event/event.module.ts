import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EventRoutingModule, routingComponents } from '@app/event/event-routing.module';
import { EventService } from '@app/event/event.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        EventRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        routingComponents
    ],
    providers: [
        EventService
    ]
})
export class EventModule {
}
