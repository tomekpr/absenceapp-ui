import { Component } from '@angular/core';
import { PingService } from './services/ping.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private pingService: PingService, private authService: AuthService) {

  }

  requestPing() {
    this.pingService.ping();
    console.log("Done. Did you get pong?");
  }

  auth() {
    this.authService.authenticate("n/a","n/a")
    .subscribe(res => console.log(res), err => console.log(err));
  }
}
