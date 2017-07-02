import {Inject, Injectable} from '@angular/core'
import {Http,RequestOptions, Headers, Response} from '@angular/http';
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
}