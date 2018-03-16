import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { EventModule } from '@app/event/event.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        routingComponents
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        EventModule,
        HttpClientModule,
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
