import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IApiResponse } from '@app/core/interface/api-response.interface';
import { IUser } from '@app/user/user.interface';
import { UserService } from '@app/user/user.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent {
    public userForm: FormGroup;

    private userService: UserService;
    private route: ActivatedRoute;
    private router: Router;

    public constructor(userService: UserService,
                       route: ActivatedRoute,
                       router: Router,
                       fb: FormBuilder) {
        this.userService = userService;
        this.route = route;
        this.router = router;

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

    public onFormSubmit(): void {
        const user: IUser = {
            firstName: this.userForm.get('firstName').value,
            middleName: this.userForm.get('middleName').value,
            lastName: this.userForm.get('lastName').value,
            email: this.userForm.get('email').value,
            telephone: this.userForm.get('telephone').value,
            address: this.userForm.get('address').value,
            city: this.userForm.get('city').value,
            zipCode: this.userForm.get('zipCode').value,
            birthDate: this.userForm.get('birthDate').value,
            roles: [],
            events: []
        };

        this.userService.create(user).subscribe((response: IApiResponse<IUser | undefined>): void => {
            this.router.navigate(['../list'], {
                relativeTo: this.route
            });
        });
    }
}
