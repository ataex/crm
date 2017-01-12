import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Response } from '@angular/http';
import { SecurityService } from '../../shared/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
    providers : [ UserService, SecurityService ]
})
export class LogoutComponent implements OnInit {

    constructor(private userService : UserService, private securityService: SecurityService, private router: Router) { }

    ngOnInit() {
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
