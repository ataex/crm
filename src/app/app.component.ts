import { Component, OnInit } from '@angular/core';
import * as socketIO from 'socket.io-client';
declare var Notification: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        let socket = socketIO('http://localhost:3000');
        socket.on('connect', () => {});
        socket.on('news', (data) => {
            console.log(data);
        });


        //Notification.requestPermission();
        //new Notification("Hi Thom");

    }
}
