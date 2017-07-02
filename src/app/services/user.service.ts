import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {JoinUserDto} from './contracts/join.user.dto';
import {Http,RequestOptions, Headers, Response} from '@angular/http';
import { ApiConstants } from "app/services/api.constants";
import { HttpHelper } from "app/services/helpers/httphelpers";

@Injectable() // inaczej angular krzyczy ze tego nie zna
// https://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
export class UserService {

     constructor(@Inject(ApiConstants.API_USERS_URL) private apiUrl: string, private http: Http) {}

    getUser(id: string): any {
        let u = new User();
        return Observable.of(u);
    }

    joinUser(user: JoinUserDto): any {
        const options = HttpHelper.getCommonRequestOptions();
        return this.http.post(this.apiUrl + 'joinuser', user, options);
    }
}