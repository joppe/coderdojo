import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IApiResponse } from '@app/core/interface/api-response.interface';
import { IEvent } from '@app/event/event.interface';
import { EventService } from '@app/event/event.service';
import { DateFormatService } from '@app/shared/service/date-format.service';

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
    private dateFormatService: DateFormatService;

    public constructor(eventService: EventService,
                       route: ActivatedRoute,
                       router: Router,
                       fb: FormBuilder,
                       dateFormatService: DateFormatService) {
        this.eventService = eventService;
        this.route = route;
        this.router = router;
        this.dateFormatService = dateFormatService;

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
                    this.eventForm.reset({
                        type: response.data.type,
                        date: this.dateFormatService.date(response.data.date)
                    });
                }
            });
        });
    }

    public onFormSubmit(): void {
        const event: IEvent = {
            type: this.eventForm.get('type').value,
            date: this.eventForm.get('date').value
        };

        this.eventService.update(this.id, event).subscribe((response: IApiResponse<IEvent | undefined>): void => {
            this.router.navigate(['../../list'], {
                relativeTo: this.route
            });
        });
    }

    public getTypes(): string[] {
        return this.eventService.getTypes();
    }
}
