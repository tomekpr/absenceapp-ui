import {Injectable} from '@angular/core';

@Injectable()
export class LogService {
    debug(msg:string):void {
        console.log("[DEBUG:]", msg);
    }
    error(msg:string):void {
        console.log("[ERROR:]",msg);
    }
}