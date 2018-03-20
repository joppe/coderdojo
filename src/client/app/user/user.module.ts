import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { NamePipe } from '@app/user/name.pipe';
import { routingComponents, UserRoutingModule } from '@app/user/user-routing.module';
import { UserService } from '@app/user/user.service';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        NamePipe,
        routingComponents
    ],
    providers: [
        UserService
    ]
})
export class UserModule {
}
