import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-register-form',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            company: ['', Validators.required],
            email: ['', Validators.required]
        });
    }

    onSubmit() {
        console.log(this.registerForm.value);
    }

}
