import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { PingService } from './services/ping.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    {provide: 'API_PING_URL', useValue: 'https://absenceapp.herokuapp.com/'},
    {provide: PingService, useClass: PingService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
