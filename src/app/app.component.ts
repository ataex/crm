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
        socket.on('connect', function(){});
        socket.on('event', function(data){});
        socket.on('disconnect', function(){});

        Notification.requestPermission();
        new Notification("Hi Thom");

    }
}
