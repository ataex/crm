import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";

@Injectable()
export class SecurityService {

    constructor() { }

    isLogged() {
        return !!localStorage.getItem('X-Auth-Token');
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

    getAuthToken() {
        return localStorage.getItem('X-Auth-Token');
    }

    deleteAuthToken() {
        return localStorage.removeItem('X-Auth-Token');
    }
}
