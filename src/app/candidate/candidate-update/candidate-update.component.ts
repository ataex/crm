import { Component, OnInit } from '@angular/core';
import { CandidateService } from "../candidate.service";

@Component({
  selector: 'app-candidate-update',
  templateUrl: './candidate-update.component.html',
  styleUrls: ['./candidate-update.component.scss'],
  providers: [CandidateService]
})
export class CandidateUpdateComponent implements OnInit {

  candidate: any = {};

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    let candidateId = '5859b8fa42cf1a54e7775782';
    this.candidateService.getCandidate(candidateId).subscribe((candidate) => this.candidate = candidate);

    console.log(this.candidate);
  }
  //   this.candidate = {
  //     "_id":"5859b8fa42cf1a54e7775782",
  //     "firstname":"Thomas",
  //     "lastname":"Bousquet",
  //     "email":"thomas.bousquet@gmail.com",
  //     "__v":0,
  //     "updatedAt":"2016-12-20T23:04:17.422Z",
  //     "availableUntil":null,
  //     "availableFrom":null,
  //     "phone":5146258499,
  //     "birthdate":"1984-02-02T00:00:00.000Z"
  //   };
  // }

}
