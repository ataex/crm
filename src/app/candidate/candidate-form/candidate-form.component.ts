import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {

  candidateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  @Input() candidate: any = {};

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });

    if(this.candidate) this.candidateForm.patchValue(this.candidate);
  }

  onSubmit() {
    console.log(this.candidateForm.value);
  }

}
