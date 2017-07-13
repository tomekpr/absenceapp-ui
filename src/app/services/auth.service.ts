import { Injectable, Inject } from '@angular/core';
import * as CryptoJS from '../../../node_modules/crypto-js/crypto-js.js';
import { Credentials } from '../model/credentials';
import {Http,RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie'
import {HttpHelper} from './helpers/httphelpers';
import {Router} from '@angular/router';
import {UserProfile} from '../model/user.profile';
import {CookieConstants} from './cookie.constants';

export interface IAuthService {
    isLoggedIn(): boolean;
    logout():  any;
    authenticate(email:string, password:string): any;
    hash(token:string): string;
    completeAuth(res:Response):any;
    getProfile(): UserProfile;
    getUserId(): string;
}

@Injectable()
export class AuthService implements IAuthService{

    constructor(@Inject('API_USERS_URL') private apiUrl: string,
        private http: Http,
        private cookieService: CookieService,
        private parentRouter: Router) {}

    getUserId(): string {
        let profile = this.getProfile();
        return profile != null ? profile.id : null;
    }

    isLoggedIn(): boolean {
        const user_id = this.cookieService.get(CookieConstants.LOGGED_USER_ID);
        if(user_id == undefined || user_id == '-1' ) {
            return false;
        }
        
        return true;
    }

    getProfile(): UserProfile {
        const user_id = this.cookieService.get(CookieConstants.LOGGED_USER_ID);
        if(user_id == undefined || user_id == '-1' ) {
            return null;
        }

        const account_type = this.cookieService.get('account_type');
        return new UserProfile(user_id, account_type);
    }

    authenticate(email:string, password:string) : any {
        console.log("Trying to auth with email:",email, " and pass:",password)

        let credentials = new Credentials(email,password);
        let options = HttpHelper.getCommonRequestOptions();

        return this.http.post(this.apiUrl + "signin", credentials, options);
    }

    completeAuth(res:Response):any {

        let response = res.json();
        console.log(response);

        this.cookieService.put(CookieConstants.LOGGED_USER_ID,response.id);

        let account_type = response.type;
        this.cookieService.put('account_type', account_type);

        if(account_type == 'pro') {
            this.parentRouter.navigateByUrl('leads');
        } else {
            this.parentRouter.navigateByUrl('user-start/' + response.id);
        }
    }

    logout(): any {
        console.log("Logging out bitch!");
        this.http.post(this.apiUrl + "logout",{});
        this.cookieService.put(CookieConstants.LOGGED_USER_ID, '-1');
        this.cookieService.remove('account_type');
    }

    hash(token:string):string {
        return CryptoJS.SHA1(token).toString(CryptoJS.enc.SHA1)
    }
}

