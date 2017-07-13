import {Inject, Injectable} from '@angular/core'
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { HttpHelper } from 'app/services/helpers/httphelpers';
import {Observable} from 'rxjs';

import {RequestHolidayDto} from './contracts/request.holiday.dto';
import { ApiConstants } from 'app/services/api.constants';

@Injectable()
export class HolidayService {

    constructor(@Inject(ApiConstants.API_HOLIDAYS_URL)
        private apiUrl: string,
        private http: Http) {}

    requestHoliday(dto: RequestHolidayDto): any {
        const options = HttpHelper.getCommonRequestOptions();
        return this.http.post(this.apiUrl + 'requestholiday', dto, options);
    }

    getLeaveRequests(userId: string): any {

        let params = new URLSearchParams();
        params.set('user_id', userId);

        let headers = HttpHelper.getHeaders();
        let options = new RequestOptions({
            headers: headers,
            search: params
        });

        return this.http.get(this.apiUrl + "leaverequests", options);
    }
}