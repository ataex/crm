import { Component, OnInit } from '@angular/core';
import {CandidateService} from "../candidate.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.scss'],
  providers: [CandidateService]
})
export class CandidateCreateComponent implements OnInit {

  private candidate: any = {};

  constructor(private candidateService: CandidateService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitted(candidate) {
    this.candidateService.createCandidate(candidate).subscribe((candidate) => {
      this.router.navigateByUrl('/candidate/update/' + candidate._id);
      console.log(candidate);
    });
  }

}
