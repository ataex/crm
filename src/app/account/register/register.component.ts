import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AccountService } from "../account.service";

@Component({
    selector: 'app-register-form',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers : [ AccountService ]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registeredMessage: String;

    constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

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
            this.registeredMessage = response.message;
        });
    }

}
