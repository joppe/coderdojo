import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guard/auth.guard';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'event',
        loadChildren: 'app/event/event.module#EventModule',
        data: {
            preload: true
        },
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'user',
        loadChildren: 'app/user/user.module#UserModule',
        data: {
            preload: true
        },
        canActivate: [
            AuthGuard
        ]
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {
}

export const routingComponents: Object[] = [
    HomeComponent,
    LoginComponent
];
