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

  constructor(private candidateService: CandidateService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.candidateService.getCandidate(params['id']).subscribe((candidate) => this.candidate = candidate );
    });
  }

}
