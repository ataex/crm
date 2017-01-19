import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [ UserService ]
})
export class UserListComponent implements OnInit {

    private users: any = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }

    deleteUser(user) {
        let displayedUser = user;
        this.userService.deleteUser(user._id).subscribe((user) => {
            _.pull(this.users, displayedUser);
        });
    }

}
