import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventRoutingModule, routingComponents } from '@app/event/event-routing.module';
import { EventService } from '@app/event/event.service';

@NgModule({
    imports: [
        CommonModule,
        EventRoutingModule
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
