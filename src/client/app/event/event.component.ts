import { Component, OnInit } from '@angular/core';

import { EventService } from '../service/api/event.service';
import { IEvent } from './event.interface';
import { IApiResponse } from '../service/api/api.response.interface';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
    public events: IEvent[] = [];

    private eventService: EventService;

    public constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    public ngOnInit(): void {
        this.eventService.getAll().subscribe((response: IApiResponse<IEvent[] | undefined>): void => {
            if (response.status === 200) {
                this.events = response.data;
            }
        });
    }
}
