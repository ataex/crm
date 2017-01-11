import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {

  constructor() { }

    isLogged() {
        return localStorage.getItem('X-Auth-Token') ? true : false;
    }

    getAuthToken() {
        return localStorage.getItem('X-Auth-Token');
    }
}
