import { Component, OnInit } from '@angular/core';

import { IApiResponse } from '@app/core/interface/api-response.interface';
import { IUser } from '@app/user/user.interface';
import { UserService } from '@app/user/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    public users: IUser[] = [];

    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public ngOnInit(): void {
        this.getUsers();
    }

    public remove(user: IUser): void {
        if (window.confirm('Really remove?')) {
            this.userService.remove(user._id).subscribe((response: IApiResponse<undefined>): void => {
                this.getUsers();
            });
        }
    }

    private getUsers(): void {
        this.userService.getAll().subscribe((response: IApiResponse<IUser[] | undefined>): void => {
            if (response.status === 200) {
                this.users = response.data;
            }
        });
    }
}
