import {Headers, RequestOptions} from '@angular/http';

export class HttpHelper {
    static getHeaders() : Headers {
        return new Headers({ 'Content-Type': 'application/json' });
    }

    static getCommonRequestOptions(): RequestOptions {
        return new RequestOptions({headers: HttpHelper.getHeaders()});
    }
}