import { Component, OnInit } from '@angular/core';
import { SecurityService } from "../shared/security.service";
import { Router, NavigationEnd } from '@angular/router';
import { Response } from '@angular/http';
import { UserService } from "../authentication/user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers : [ UserService ]
})
export class HeaderComponent implements OnInit {

    isLogged;

    constructor(private securityService: SecurityService, private userService : UserService, private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.isLogged = this.securityService.isLogged();
            }
        });
    }

    logout() {
        let securityService = this.securityService;

        this.userService.logout().subscribe((response:Response) => {

            let authToken = response.headers.get('X-Auth-Token');

            if(!authToken) {
                securityService.deleteAuthToken();
                this.router.navigate(['/login'], { queryParams : { logged_out : 1 }})
            }
        });
    }

}
