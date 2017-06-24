import { Injectable, Inject } from '@angular/core';
//import * as CryptoJS from '../../../node_modules/crypto-js/crypto-js.js';
import { Credentials } from '../model/credentials';
import {Http,RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
//import {CookieService} from 'ngx-cookie'
import {HttpHelper} from './helpers/httphelpers';
//import {Router} from '@angular/router';
//import {Profile} from '../model/profile';

export interface IAuthService {
    //isLoggedIn(): boolean;
    //logout():  any;
    authenticate(email:string, password:string): any;
    //hash(token:string): string;
    //completeAuth(res:Response):any;
    //getProfile(): Profile;
}

@Injectable()
export class AuthService implements IAuthService{

    constructor(@Inject('API_USERS_URL') private apiUrl: string,
        private http: Http) {} 

        //private cookieService: CookieService,
        //private parentRouter: Router) {}

    // isLoggedIn() : boolean {
    //     const user_id = this.cookieService.get('logged_user_id');
    //     if(user_id == undefined || user_id == '-1' ) {
    //         return false;
    //     }
        
    //     return true;
    // }

    // getProfile(): Profile {
    //     const user_id = this.cookieService.get('logged_user_id');
    //     if(user_id == undefined || user_id == '-1' ) {
    //         return null;
    //     }

    //     const account_type = this.cookieService.get('account_type');
    //     return new Profile(user_id, "name", account_type);
    // }

    authenticate(email:string, password:string) : any {
        console.log("Trying to auth with email:",email, " and pass:",password)

        let credentials = new Credentials("u@u.com","516b9783fca517eecbd1d064da2d165310b19759");
        let options = HttpHelper.getCommonRequestOptions();

        return this.http.post(this.apiUrl + "signin", credentials, options);
    }

    // completeAuth(res:Response):any {
    //     var user_id = res.headers.get('logged_user_id');
    //     this.cookieService.put('logged_user_id',user_id);

    //     let account_type = res.text();
    //     this.cookieService.put('account_type', account_type);

    //     if(account_type == 'pro') {
    //         this.parentRouter.navigateByUrl('leads');
    //     } else {
    //         this.parentRouter.navigateByUrl('projects/' + user_id);
    //     }
    // }

    // logout(): any {
    //     console.log("Logging out bitch!");
    //     this.http.post(this.apiUrl + "logout",{});
    //     this.cookieService.put('logged_user_id', '-1');
    //     this.cookieService.remove('account_type');
    // }

    // hash(token:string):string {
    //     return CryptoJS.SHA1(token).toString(CryptoJS.enc.SHA1)
    // }
}

