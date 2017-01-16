import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss'],
    providers: [AccountService]
})
export class ActivateComponent implements OnInit {

    private token: String;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private accountService: AccountService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.token = params['token'];
            this.accountService.activate(this.token).subscribe((account) => {
                this.router.navigate(['/login'], { queryParams : { accountActivated : 1 } });
            });
        });
    }
}
