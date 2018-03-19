import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';
import { IApiResponse } from '@app/service/api/api.response.interface';

const EVENT_ID_PROPERTY: string = 'id';

@Component({
    selector: 'app-event-edit',
    templateUrl: './event-edit.component.html'
})
export class EventEditComponent implements OnInit {
    public eventForm: FormGroup;

    private id: string;
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

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params): void => {
            this.eventService.get(params[EVENT_ID_PROPERTY]).subscribe((response: IApiResponse<IEvent | undefined>): void => {
                if (response.status === 200) {
                    this.id = response.data._id;
                    this.eventForm.reset(response.data);
                }
            });
        });
    }

    public onFormSubmit(): void {
        const date: Date = new Date(this.eventForm.get('date').value);
        const event: IEvent = {
            type: <string>this.eventForm.get('type').value,
            date: (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()
        };

        this.eventService.update(this.id, event).subscribe((response: IApiResponse<IEvent | undefined>): void => {
            window.console.log('finished update');
            this.router.navigate(['../../list'], {
                relativeTo: this.route
            });
        });
    }
}
