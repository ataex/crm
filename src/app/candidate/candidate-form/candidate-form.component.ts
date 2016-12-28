import {Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  candidateForm: FormGroup;
  @Input() candidate: any = {};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  ngOnChanges(changes) {
    let candidate = changes.candidate.currentValue;

    if(!_.isEmpty(candidate)) {
      this.candidateForm.patchValue(candidate);
    }
  }
}
