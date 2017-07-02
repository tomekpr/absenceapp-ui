  import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LogService } from '../services/log.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth_service: AuthService, private logger: LogService, @Inject('BRAND_NAME') public brandName:string) { 
  }

  ngOnInit() {
  }

  is_user_logged_in():boolean {
    return this.auth_service.isLoggedIn();
  }

  getUserId(): string {
    return this.auth_service.getProfile().id;
  }

  logout():any {
    this.auth_service.logout();
  }

  getUserType():string {
    return this.auth_service.getProfile().type;
  }

}