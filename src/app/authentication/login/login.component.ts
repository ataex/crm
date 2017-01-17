import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { SecurityService } from '../../shared/security.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers : [ UserService, SecurityService ]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    queryParams: {};
    loginMessage: String;

    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private securityService: SecurityService
    ) { }

    ngOnInit() {

        if(this.securityService.isLogged()) this.router.navigateByUrl('/dashboard');

        this.loginForm = this.formBuilder.group({
            email : ['', Validators.required],
            password : ['', Validators.required]
        });

        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.queryParams = queryParams;
        });

        if(sessionStorage.getItem('accountCreated')) {
            this.loginMessage = 'You are now registered, please check your email and confirm your account.';
            sessionStorage.removeItem('accountCreated');
        }
    }

    onSubmit() {
        this.userService.login(this.loginForm.value).subscribe(
            (response: Response) => {
                this.securityService.setAuthToken(response.headers.get('X-Auth-Token'));
                this.router.navigateByUrl('/dashboard');
            },
            error => {
                this.loginMessage = 'Your credentials are not valid.';
            }
        );
    }
}
