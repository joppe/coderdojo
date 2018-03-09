import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { eventServiceInjectables } from './service/api/event.service';

@NgModule({
    declarations: [
        AppComponent,
        routingComponents
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        eventServiceInjectables
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
