import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

    activateForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.activateForm = this.formBuilder.group({
            password : ['', Validators.required],
            passwordRepeat : ['', Validators.required]
        });
    }

    onSubmit() {

    }

}
