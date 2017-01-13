import { Component, OnInit } from '@angular/core';
import { SecurityService } from "../shared/security.service";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isLogged;

    constructor(private securityService: SecurityService, private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.isLogged = this.securityService.isLogged();
            }
        });
    }

}
