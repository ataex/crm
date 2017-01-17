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

    ngOnInit() {}

    onSubmit(candidate) {
        this.candidateService.createCandidate(candidate).subscribe((candidate) => {
            sessionStorage.setItem('candidateCreated', '1');
            this.router.navigateByUrl('/candidate/update/' + candidate._id);
        });
    }

}
