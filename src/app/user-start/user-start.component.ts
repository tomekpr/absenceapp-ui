import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LogService} from '../services/log.service';
import { UserService} from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user-start',
  templateUrl: './user-start.component.html',
  styleUrls: ['./user-start.component.css']
})
export class UserStartComponent implements OnInit {

  user_id: string;
  user: User;

  constructor(private routeParams:ActivatedRoute, private logService: LogService, private userService: UserService) { 
    routeParams.params.subscribe(p => {
      this.user_id = p['id'];
      logService.debug("User id: " + this.user_id);
      this.getUser()
    })
  }

  getUser(): any {
    this.userService.getUser(this.user_id)
    .subscribe(res => {
      //this.user = res.json();
      this.logService.debug(res);
    })
  }

  ngOnInit() {
  }

}
