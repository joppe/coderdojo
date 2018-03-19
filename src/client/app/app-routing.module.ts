import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@app/home/home.component';
import { UserComponent } from '@app/user/user.component';

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
        path: 'event',
        loadChildren: 'app/event/event.module#EventModule',
        data: {
            preload: true
        }
    },
    {
        path: 'user',
        component: UserComponent
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
    UserComponent
];
