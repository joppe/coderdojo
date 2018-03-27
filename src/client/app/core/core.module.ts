import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from '@app/core/alert/alert.component';
import { AlertService } from '@app/core/alert/alert.service';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { ErrorInterceptorProvider } from '@app/core/interceptor/error.interceptor';
import { JwtInterceptorProvider } from '@app/core/interceptor/jwt.interceptor';
import { AuthenticationService } from '@app/core/service/authentication.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        AlertComponent
    ],
    exports: [
        AlertComponent
    ],
    providers: [
        AlertService,
        AuthGuard,
        AuthenticationService,
        ErrorInterceptorProvider,
        JwtInterceptorProvider
    ]
})
export class CoreModule {
}
