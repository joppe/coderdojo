import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventRoutingModule, routingComponents } from './event-routing.module';
import { EventService } from './event.service';

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
