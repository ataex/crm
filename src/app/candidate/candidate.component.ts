import { Component, OnInit } from '@angular/core';
import {CandidateService} from "./candidate.service";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
  providers : [CandidateService]
})
export class CandidateComponent implements OnInit {

  private candidates = [];

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.candidateService.getCandidates().subscribe(
      (candidates) => this.candidates = candidates
    );
  }

}
