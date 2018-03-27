import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '@app/core/alert/alert.service';
import { AuthenticationService } from '@app/core/service/authentication.service';

export const RETURN_URL_QUERY_PARAM: string = 'returnUrl';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public returnUrl: string;

    private authenticationService: AuthenticationService;
    private route: ActivatedRoute;
    private router: Router;
    private alertService: AlertService;

    public constructor(authenticationService: AuthenticationService,
                       route: ActivatedRoute,
                       router: Router,
                       fb: FormBuilder,
                       alertService: AlertService) {
        this.authenticationService = authenticationService;
        this.route = route;
        this.router = router;
        this.alertService = alertService;

        this.loginForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams[RETURN_URL_QUERY_PARAM] || '/';
    }

    public login(): void {
        this.authenticationService.login(
            this.loginForm.get('email').value,
            this.loginForm.get('password').value
        ).subscribe(
            (): void => {
                    this.router.navigate([this.returnUrl]);
                },
            (error: string): void => {
                    this.alertService.error(error);
                });
    }
}
