import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';
import { IApiResponse } from '@app/service/api/api.response.interface';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html'
})
export class EventCreateComponent {
    public eventForm: FormGroup = new FormGroup({
        type: new FormControl(),
        date: new FormControl()
    });

    private eventService: EventService;
    private route: ActivatedRoute;
    private router: Router;

    public constructor(eventService: EventService,
                       route: ActivatedRoute,
                       router: Router) {
        this.eventService = eventService;
        this.route = route;
        this.router = router;
    }

    public onFormSubmit(): void {
        const date: Date = new Date(this.eventForm.get('date').value);
        const event: IEvent = {
            type: <string>this.eventForm.get('type').value,
            date: (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()
        };

        this.eventService.create(event).subscribe((response: IApiResponse<IEvent | undefined>): void => {
            this.router.navigate(['../list'], {
                relativeTo: this.route
            });
        });
    }
}
