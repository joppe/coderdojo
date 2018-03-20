import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCreateComponent } from '@app/user/create/user-create.component';
import { UserDetailComponent } from '@app/user/detail/user-detail.component';
import { UserEditComponent } from '@app/user/edit/user-edit.component';
import { UserListComponent } from '@app/user/list/user-list.component';
import { UserComponent } from '@app/user/user.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: UserListComponent
            },
            {
                path: 'detail/:id',
                component: UserDetailComponent
            },
            {
                path: 'create',
                component: UserCreateComponent
            },
            {
                path: 'edit/:id',
                component: UserEditComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule {
}

export const routingComponents: Object[] = [
    UserCreateComponent,
    UserComponent,
    UserDetailComponent,
    UserEditComponent,
    UserListComponent
];
