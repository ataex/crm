import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss'],
    providers: [ UserService ]
})
export class UserUpdateComponent implements OnInit {

    private userId: String;
    private user: any = {};
    private userCreatedMessage: String;
    private userUpdatedMessage: String;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        let userCreatedMessage = sessionStorage.getItem('userCreated');

        if(userCreatedMessage) {
            this.userCreatedMessage = 'User has been created';
            sessionStorage.removeItem('userCreated');
        }

        this.activatedRoute.params.subscribe((params) => {
            this.userId = params['id'];
            this.userService.getUser(this.userId).subscribe(user => this.user = user );
        });
    }

    onSubmit(user) {
        this.userService.updateUser(this.user._id, user).subscribe(user => {
            this.userUpdatedMessage =`User ${user.firstname} ${user.lastname} has been updated`;
        });
    }

}
