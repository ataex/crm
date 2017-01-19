import { Component, OnInit } from '@angular/core';
import {CandidateService} from "./../candidate.service";


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  providers : [CandidateService]
})
export class CandidateListComponent implements OnInit {

  private candidates = [];

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCandidates().subscribe(
      (candidates) => candidates ? this.candidates = candidates : []
    );
  }

  deleteCandidate(candidate) {
      this.candidateService.deleteCandidate(candidate._id).subscribe(candidate => {
          this.candidates.splice(candidate, 1);
      })
  }


}
