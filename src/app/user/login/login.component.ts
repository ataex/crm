import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers : [UserService]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email : ['', Validators.required],
            password : ['', Validators.required]
        });
    }

    onSubmit() {

    }

}
