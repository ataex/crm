import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-update',
  templateUrl: './candidate-update.component.html',
  styleUrls: ['./candidate-update.component.scss']
})
export class CandidateUpdateComponent implements OnInit {

  candidate: any = {};

  constructor() { }

  ngOnInit() {
    this.candidate = {
      "_id":"5859b8fa42cf1a54e7775782",
      "firstname":"Thomas",
      "lastname":"Bousquet",
      "email":"thomas.bousquet@gmail.com",
      "__v":0,
      "updatedAt":"2016-12-20T23:04:17.422Z",
      "availableUntil":null,
      "availableFrom":null,
      "phone":5146258499,
      "birthdate":"1984-02-02T00:00:00.000Z"
    };
  }

}
