import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from "../account.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register-form',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers : [ AccountService ]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            company: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            passwordRepeat: ['', Validators.required],
        });
    }

    onSubmit() {
        let account = this.registerForm.value;
        this.accountService.register(account).subscribe((response) => {
            sessionStorage.setItem('accountCreated', '1');
            this.router.navigateByUrl('/login');
        });
    }

}
