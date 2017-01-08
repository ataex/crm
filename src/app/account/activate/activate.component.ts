import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AccountService} from "../account.service";

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss'],
    providers: [AccountService]
})
export class ActivateComponent implements OnInit {

    private token: String;

    constructor(private activatedRoute: ActivatedRoute, private accountService: AccountService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.token = params['token'];
            this.accountService.activate(this.token).subscribe((account) => {
                console.log(account);
            });
        });

    }
}
