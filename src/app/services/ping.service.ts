import { Http } from '@angular/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class PingService {
    constructor(@Inject('API_PING_URL') private apiUrl: string, private http: Http) {

    }

    ping(): any {
        let url = this.apiUrl + 'ping';
        this.http.get(url)
        .subscribe(res => console.log(res));
    }
}