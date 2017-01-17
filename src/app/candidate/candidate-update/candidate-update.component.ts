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
    private candidateUpdatedMessage: String;
    private candidateCreatedMessage: String;

    constructor(private candidateService: CandidateService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        let candidateCreated = sessionStorage.getItem('candidateCreated');
        if(candidateCreated) {
            this.candidateCreatedMessage = 'Candidate has been created';
            sessionStorage.removeItem('candidateCreated');
        }

        this.activatedRoute.params.subscribe((params) => {
            this.candidateId = params['id'];
            this.candidateService.getCandidate(this.candidateId).subscribe((candidate) => this.candidate = candidate );
        });
    }

    onSubmit(candidate) {
        this.candidateService.updateCandidate(this.candidateId, candidate).subscribe((candidate) => {
            this.candidateUpdatedMessage = 'Candidate has been updated';
        });
    }

}
