import { Component, OnInit } from '@angular/core';

import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';
import { IApiResponse } from '@app/service/api/api.response.interface';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {
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
