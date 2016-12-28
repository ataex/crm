import { Component, OnInit } from '@angular/core';
import {CandidateService} from "../candidate.service";

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.scss'],
  providers: [CandidateService]
})
export class CandidateCreateComponent implements OnInit {

  private candidate: any = {};

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
  }

  onSubmitted(candidate) {
    this.candidateService.createCandidate(candidate).subscribe((candidate) => {
      console.log(candidate);
    });
  }

}
