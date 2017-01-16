import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    userForm: FormGroup;
    @Input() user = {};
    @Output() submitted = new EventEmitter;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstname : ['', Validators.required],
            lastname : ['', Validators.required],
            email : ['', Validators.required],
            password : ['', Validators.required]
        })
    }

    ngOnChanges(changes) {
        let user = changes.user.currentValue;

        if(!_.isEmpty(user)) {
            this.userForm.patchValue(user);
        }
    }

    onSubmit() {
        this.submitted.emit(this.userForm.value);
    }

}
