import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers : [UserService]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    queryParams: {};

    constructor(private formBuilder: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email : ['', Validators.required],
            password : ['', Validators.required]
        });

        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.queryParams = queryParams;
        });
    }

    onSubmit() {
        this.userService.login(this.loginForm.value).subscribe((response: Response) => {
            console.log(response);
        });
    }

}
