import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IApiResponse } from '@app/core/interface/api-response.interface';
import { DateFormatService } from '@app/shared/service/date-format.service';
import { IUser } from '@app/user/user.interface';
import { UserService } from '@app/user/user.service';

const USER_ID_PROPERTY: string = 'id';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    public userForm: FormGroup;

    private id: string;
    private userService: UserService;
    private route: ActivatedRoute;
    private router: Router;
    private dateFormatService: DateFormatService;

    public constructor(userService: UserService,
                       route: ActivatedRoute,
                       router: Router,
                       fb: FormBuilder,
                       dateFormatService: DateFormatService) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.dateFormatService = dateFormatService;

        this.userForm = fb.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            telephone: [''],
            address: [''],
            city: [''],
            zipCode: [''],
            birthDate: ['']
        });
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params): void => {
            this.userService.get(params[USER_ID_PROPERTY]).subscribe((response: IApiResponse<IUser | undefined>): void => {
                if (response.status === 200) {
                    this.id = response.data._id;
                    this.userForm.reset({
                        firstName: response.data.firstName,
                        middleName: response.data.middleName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        telephone: response.data.telephone,
                        address: response.data.address,
                        city: response.data.city,
                        zipCode: response.data.zipCode,
                        birthDate: this.dateFormatService.date(response.data.birthDate),
                        roles: [],
                        events: []
                    });
                }
            });
        });
    }

    public onFormSubmit(): void {
        const user: Partial<IUser> = {
            firstName: this.userForm.get('firstName').value,
            middleName: this.userForm.get('middleName').value,
            lastName: this.userForm.get('lastName').value,
            email: this.userForm.get('email').value,
            telephone: this.userForm.get('telephone').value,
            address: this.userForm.get('address').value,
            city: this.userForm.get('city').value,
            zipCode: this.userForm.get('zipCode').value,
            birthDate: this.userForm.get('birthDate').value
        };

        this.userService.update(this.id, user).subscribe((response: IApiResponse<IUser | undefined>): void => {
            this.router.navigate(['../../list'], {
                relativeTo: this.route
            });
        });
    }
}
