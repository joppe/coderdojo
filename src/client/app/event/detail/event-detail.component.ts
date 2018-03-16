import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';
import { IApiResponse } from '@app/service/api/api.response.interface';

const EVENT_ID_PROPERTY: string = 'id';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {
    public event: IEvent;

    private eventService: EventService;
    private route: ActivatedRoute;

    public constructor(eventService: EventService,
                       route: ActivatedRoute) {
        this.eventService = eventService;
        this.route = route;
    }

    public ngOnInit(): void {

        this.route.params.subscribe((params: Params): void => {
            this.eventService.get(params[EVENT_ID_PROPERTY]).subscribe((response: IApiResponse<IEvent | undefined>): void => {
                if (response.status === 200) {
                    this.event = response.data;
                }
            });
        });
    }
}
