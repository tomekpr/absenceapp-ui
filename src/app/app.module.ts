import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { PingService } from './services/ping.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    // {provide: 'API_PING_URL', useValue: 'http://localhost:9292/'},
    // {provide: 'API_USERS_URL', useValue: 'http://localhost:9292/api/v1/'},

    {provide: 'API_PING_URL', useValue: 'https://absenceapp.herokuapp.com/'},
    {provide: 'API_USERS_URL', useValue: 'https://absenceapp.herokuapp.com/api/v1/'},
    
    {provide: PingService, useClass: PingService},
    {provide: AuthService, useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
