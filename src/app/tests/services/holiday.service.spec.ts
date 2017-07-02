import {inject, fakeAsync, tick, TestBed} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, RequestMethod, BaseRequestOptions, Response, ResponseOptions, Headers } from '@angular/http';

import {CookieModule} from 'ngx-cookie'
import {CookieService} from 'ngx-cookie'

import {HolidayService} from '../../services/holiday.service';
import {LogService} from '../../services/log.service';
import {Credentials} from '../../model/credentials';

import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiConstants } from 'app/services/api.constants';
import * as DTOS from '../../services/contracts/request.holiday.dto';

describe('HolidayService spec', () => {
    let mockBackend: MockBackend;
    let holidayService: HolidayService;

    let apiUrl:string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                BaseRequestOptions,
                MockBackend,
                HolidayService,
                LogService,
                { provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }, deps: [MockBackend, BaseRequestOptions]},
                {provide: 'API_HOLIDAYS_URL', useValue: ApiConstants.API_HOLIDAYS_URL}
            ]
        })
    })

    beforeEach(inject([HolidayService, MockBackend], (us: HolidayService, mb: MockBackend) => {
        this.holidayService = us
        this.mockBackend = mb

        this.apiUrl = ApiConstants.API_HOLIDAYS_URL;
    }))

    describe("when requesting new holiday", () => {
        it("performs a POST request with correct parameters", fakeAsync(() => {
            
            var dto = new DTOS.RequestHolidayDto("name","email","password","company_id",'aa','aa')

            var res;
            let callCount = 0;
            this.mockBackend.connections.subscribe(c=> {
                expect(c.request.url).toBe(this.apiUrl + 'requestholiday');
                expect(c.request.method).toBe(RequestMethod.Post);

                let params = JSON.parse(c.request.getBody());
                expect(params.user_id).toBe(dto.user_id);
                expect(params.start_date).toBe(dto.start_date);
                expect(params.end_date).toBe(dto.end_date);
                expect(params.return_date).toBe(dto.return_date);
                expect(params.description).toBe(dto.description);
                expect(params.type).toBe(dto.type);

                callCount += 1;

                let response = new ResponseOptions({status:200,body:'blah'});
                c.mockRespond(new Response(response));
            });

            this.holidayService.requestHoliday(dto);

            tick();
            expect(callCount).toBe(1);
        }));
})
})
