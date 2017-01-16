import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { SecurityService } from '../shared/security.service';

@Injectable()
export class UserService {

    private userUrl = environment.baseUrl + 'api/authentication';
    private securityRequestOptions;

    constructor(private http: Http, private securityService: SecurityService) {
        this.securityRequestOptions = this.securityService.getRequestOptions();
    }

    login(formData) {
        return this.http.post(this.userUrl + '/login', formData).catch(this.handleError);
    }

    logout() {
        return this.http.delete(this.userUrl + '/logout', this.securityRequestOptions).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
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
