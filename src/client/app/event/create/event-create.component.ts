import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';
import { IApiResponse } from '@app/service/api/api.response.interface';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html'
})
export class EventCreateComponent {
    public eventForm: FormGroup;

    private eventService: EventService;
    private route: ActivatedRoute;
    private router: Router;

    public constructor(eventService: EventService,
                       route: ActivatedRoute,
                       router: Router,
                       fb: FormBuilder) {
        this.eventService = eventService;
        this.route = route;
        this.router = router;

        this.eventForm = fb.group({
            type: ['', Validators.required],
            date: ['', Validators.required]
        });
    }

    public onFormSubmit(): void {
        const event: IEvent = {
            type: this.eventForm.get('type').value,
            date: this.eventForm.get('date').value
        };

        this.eventService.create(event).subscribe((response: IApiResponse<IEvent | undefined>): void => {
            this.router.navigate(['../list'], {
                relativeTo: this.route
            });
        });
    }

    public getTypes(): string[] {
        return this.eventService.getTypes();
    }
}
