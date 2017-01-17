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

    deleteUser(id) {
        this.userService.deleteUser(id).subscribe((user) => {
            console.log(user);
        });
    }

    //isPartOfCollection(deletedUser) {
    //
    //    let isPartOfCollection = false;
    //
    //    this.users.foreach((user, index) => {
    //        if(deletedUser._id == user._id) return true
    //    });
    //
    //    return isPartOfCollection;
    //
    //}

}
