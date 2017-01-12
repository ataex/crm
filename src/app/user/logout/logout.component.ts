import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Response } from '@angular/http';
import { SecurityService } from "../../shared/security.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
    providers : [ UserService ]
})
export class LogoutComponent implements OnInit {

    constructor(private userService : UserService, private securityService: SecurityService) { }

    ngOnInit() {
    }

    logout() {
        this.userService.logout().subscribe((response:Response) => {
            console.log(response.headers);
            //this.securityService.deleteAuthToken();
        });
    }

}
