import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie'

import {LogService} from './services/log.service';
import {UserService} from './services/user.service';
import {HolidayService} from './services/holiday.service';


import { AppComponent } from './app.component';

import { PingService } from './services/ping.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HelloComponent } from './hello/hello.component';
import { TermsComponent } from './terms/terms.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RequestHolidayComponent } from './request-holiday/request-holiday.component';
import { UserStartComponent } from './user-start/user-start.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { ApiConstants } from "app/services/api.constants";
import { JoinUserComponent } from './join-user/join-user.component';
import { SelectAccountComponent } from './select-account/select-account.component';

const routes: Routes = [
  {path: '', redirectTo: 'hello', pathMatch: 'full'},
  {path: 'hello', component: HelloComponent},
  {path: 'user-start/:id', component: UserStartComponent},
  {path: 'requestholiday', component: RequestHolidayComponent},
  {path: 'pendingrequests/:user_id', component: PendingRequestsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'about', component: AboutComponent},
  {path: 'joinuser', component: JoinUserComponent},
  {path: 'selectaccount', component: SelectAccountComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    ContactusComponent,
    FooterComponent,
    HelloComponent,
    TermsComponent,
    NavigationComponent,
    RequestHolidayComponent,
    UserStartComponent,
    PendingRequestsComponent,
    JoinUserComponent,
    SelectAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CookieModule.forRoot()
  ],
  providers: [
     //{provide: 'API_PING_URL', useValue: 'http://localhost:9292/'},
     //{provide: ApiConstants.API_USERS_URL, useValue: 'http://localhost:9292/api/v1/'},
     //{provide: ApiConstants.API_HOLIDAYS_URL, useValue: 'http://localhost:9292/api/v1/'},

    {provide: 'API_PING_URL', useValue: 'https://absenceapp.herokuapp.com/'},
    {provide: ApiConstants.API_USERS_URL, useValue: 'https://absenceapp.herokuapp.com/api/v1/'},
    {provide: ApiConstants.API_HOLIDAYS_URL, useValue: 'https://absenceapp.herokuapp.com/api/v1/'},

    {provide: 'BRAND_NAME', useValue: 'Absence tracker'},
    {provide: PingService, useClass: PingService},
    {provide: AuthService, useClass: AuthService},
    {provide: LogService, useClass: LogService},
    {provide: UserService, useClass: UserService},
    {provide: HolidayService, useClass: HolidayService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
