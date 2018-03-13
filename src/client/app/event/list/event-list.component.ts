import { Component, OnInit } from '@angular/core';

import { IApiResponse } from '../../service/api/api.response.interface';
import { EventService } from '../event.service';
import { IEvent } from '../event.interface';

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
