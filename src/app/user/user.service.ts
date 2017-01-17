import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { SecurityService } from '../shared/security.service';
import { Observable } from "rxjs";

@Injectable()
export class UserService {

    private userUrl = environment.baseUrl + 'api/user';
    private securityRequestOptions = {};

    constructor(private http: Http, private security: SecurityService) {
        this.securityRequestOptions = this.security.getRequestOptions();
    }

    getUsers() {
        return this.http.get(this.userUrl, this.securityRequestOptions).map(this.extractData).catch(this.handleError);
    }

    getUser(id) {
        return this.http.get(this.userUrl + '/' + id, this.securityRequestOptions).map(this.extractData).catch(this.handleError);
    }

    createUser(user) {
        return this.http.post(this.userUrl, user, this.securityRequestOptions).map(this.extractData).catch(this.handleError);
    }

    updateUser(id, user) {
        return this.http.patch(this.userUrl + '/' + id, user, this.securityRequestOptions).map(this.extractData).catch(this.handleError);
    }

    deleteUser(id) {
        return this.http.delete(this.userUrl + '/' + id, this.securityRequestOptions).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
