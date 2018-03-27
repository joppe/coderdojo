import { Component, OnInit } from '@angular/core';

import { IApiResponse } from '@app/core/interface/api-response.interface';
import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';

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
        this.getEvents();
    }

    public remove(event: IEvent): void {
        if (window.confirm('Really remove?')) {
            this.eventService.remove(event._id).subscribe((response: IApiResponse<undefined>): void => {
                this.getEvents();
            });
        }
    }

    private getEvents(): void {
        this.eventService.getAll().subscribe((response: IApiResponse<IEvent[] | undefined>): void => {
            if (response.status === 200) {
                this.events = response.data;
            }
        });
    }
}
