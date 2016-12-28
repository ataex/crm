import { Component, OnInit } from '@angular/core';
import { CandidateService } from "../candidate.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-candidate-update',
  templateUrl: './candidate-update.component.html',
  styleUrls: ['./candidate-update.component.scss'],
  providers: [CandidateService]
})
export class CandidateUpdateComponent implements OnInit {

  private candidate: any = {};
  private candidateId: String;

  constructor(private candidateService: CandidateService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.candidateId = params['id'];
      this.candidateService.getCandidate(this.candidateId).subscribe((candidate) => this.candidate = candidate );
    });
  }

  onSubmitted(candidate) {
    this.candidateService.updateCandidate(this.candidateId, candidate).subscribe((candidate) => {
      console.log(candidate);
    });
  }

}
