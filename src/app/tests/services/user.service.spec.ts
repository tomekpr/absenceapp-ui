import {inject, fakeAsync, tick, TestBed} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, RequestMethod, BaseRequestOptions, Response, ResponseOptions, Headers } from '@angular/http';

import {CookieModule} from 'ngx-cookie'
import {CookieService} from 'ngx-cookie'

import {UserService} from '../../services/user.service';
import {LogService} from '../../services/log.service';
import {Credentials} from '../../model/credentials';

import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiConstants } from "app/services/api.constants";
import * as DTOS from '../../services/contracts/join.user.dto';

describe('UserService behaviour', () => {
    let mockBackend: MockBackend;
    let userService: UserService;

    let apiUrl:string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                BaseRequestOptions,
                MockBackend,
                UserService,
                LogService,
                { provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [MockBackend, BaseRequestOptions]},
                {provide: 'API_USERS_URL', useValue: ApiConstants.API_USERS_URL}
            ]
        })
    })

    beforeEach(inject([UserService, MockBackend], (us: UserService, mb: MockBackend) => {
        this.userService = us
        this.mockBackend = mb

        this.apiUrl = ApiConstants.API_USERS_URL;
    }))

    describe("when authenticating a user", () => {
        it("performs a POST request with correct parameters", fakeAsync(() => {
            
            var dto = new DTOS.JoinUserDto("name","email","password","dfs233")

            var res;
            let callCount = 0;
            this.mockBackend.connections.subscribe(c=> {
                expect(c.request.url).toBe(this.apiUrl + "joinuser");
                expect(c.request.method).toBe(RequestMethod.Post);

                let params = JSON.parse(c.request.getBody());
                expect(params.name).toBe(dto.name);
                expect(params.email).toBe(dto.email);
                expect(params.password).toBe(dto.password);
                expect(params.company_token).toBe(dto.company_token);

                callCount += 1;

                let response = new ResponseOptions({status:200,body:'blah'});
                c.mockRespond(new Response(response));
            });

            this.userService.joinUser(dto);

            tick();
            expect(callCount).toBe(1);
        }));
})
})
