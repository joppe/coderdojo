import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IApiResponse } from '@app/service/api/api.response.interface';
import { IUser } from '@app/user/user.interface';
import { UserService } from '@app/user/user.service';

const USER_ID_PROPERTY: string = 'id';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    public user: IUser;

    private userService: UserService;
    private route: ActivatedRoute;

    public constructor(userService: UserService,
                       route: ActivatedRoute) {
        this.userService = userService;
        this.route = route;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params): void => {
            this.userService.get(params[USER_ID_PROPERTY]).subscribe((response: IApiResponse<IUser | undefined>): void => {
                if (response.status === 200) {
                    this.user = response.data;
                }
            });
        });
    }
}
