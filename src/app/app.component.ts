import { Component } from '@angular/core';
import { PingService } from './services/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private pingService: PingService) {

  }

  requestPing() {
    this.pingService.ping();
    console.log("Done. Did you get pong?");
  }
}
