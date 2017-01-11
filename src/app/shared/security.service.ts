import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from "@angular/http";

@Injectable()
export class SecurityService {

    constructor() { }

    isLogged() {
        return localStorage.getItem('X-Auth-Token') ? true : false;
    }

    getRequestOptions() {
        return { headers : this.getHeaders() };
    }

    setAuthToken(XAuthToken) {
        localStorage.setItem('X-Auth-Token', XAuthToken);
    }

    private getHeaders() {
        let headers = new Headers;
        headers.append('X-Auth-Token', this.getAuthToken());

        return headers;
    }

    private getAuthToken() {
        return localStorage.getItem('X-Auth-Token');
    }
}
