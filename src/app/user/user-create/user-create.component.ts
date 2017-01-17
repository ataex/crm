import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
    providers: [ UserService]
})
export class UserCreateComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {}

    onSubmit(user) {
        this.userService.createUser(user).subscribe(user => {
            console.log(user);
            sessionStorage.setItem('userCreated', '1');
            this.router.navigateByUrl('/user/update/' + user._id);
        });
    }

}
