import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        routingComponents
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CoreModule,
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
