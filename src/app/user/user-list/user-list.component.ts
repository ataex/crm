import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";

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
        this.userService.deleteUser(user._id).subscribe((user) => {
            this.users.splice(this.users.indexOf(user, 1));
        });
    }

}
