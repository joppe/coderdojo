import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventCreateComponent } from '@app/event/create/event-create.component';
import { EventDetailComponent } from '@app/event/detail/event-detail.component';
import { EventEditComponent } from '@app/event/edit/event-edit.component';
import { EventListComponent } from '@app/event/list/event-list.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: EventListComponent
    },
    {
        path: 'detail/:id',
        component: EventDetailComponent
    },
    {
        path: 'create',
        component: EventCreateComponent
    },
    {
        path: 'edit/:id',
        component: EventEditComponent
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
export class EventRoutingModule {
}

export const routingComponents: Object[] = [
    EventCreateComponent,
    EventDetailComponent,
    EventEditComponent,
    EventListComponent
];
