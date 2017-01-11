import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {

    constructor() { }

    isLogged() {
        return localStorage.getItem('X-Auth-Token') ? true : false;
    }

    getHeaders() {
      return { 'X-Auth-Token' : this.getAuthToken() }
    }

    setAuthToken(XAuthToken) {
        localStorage.setItem('X-Auth-Token', XAuthToken);
    }

    private getAuthToken() {
        return localStorage.getItem('X-Auth-Token');
    }
}
