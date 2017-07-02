import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service'
import {JoinUserDto} from '../services/contracts/join.user.dto';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms'
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-joinuser',
  templateUrl: './join-user.component.html',
  styleUrls: ['./join-user.component.css']
})
export class JoinUserComponent implements OnInit {

  userform:FormGroup;
  firstname:AbstractControl;
  lastname:AbstractControl;
  emailAddress:AbstractControl;
  password:AbstractControl;
  companyToken:AbstractControl;
  hasError:boolean;

  constructor(private userservice:UserService, fb: FormBuilder, private authService:AuthService,private parentRouter: Router) { 
    this.userform = fb.group({
      'firstname':['', Validators.required],
      'lastname':['', Validators.required],
      'emailAddress':['', Validators.required],
      'password':['', Validators.required],
      'companyToken':['', Validators.required]
    })

    this.firstname = this.userform.controls['firstname'];
    this.lastname = this.userform.controls['lastname'];
    this.emailAddress = this.userform.controls['emailAddress'];
    this.password = this.userform.controls['password'];
    this.companyToken = this.userform.controls['companyToken'];
  }

  ngOnInit() {
  }

  // add company id! but that's exposing company info hmmm
  join(value: FormGroup):any {
   
    this.hasError = false;

    const name = `${this.firstname.value} ${this.lastname.value}`;
    const user = new JoinUserDto(name, this.emailAddress.value, this.authService.hash(this.password.value),this.companyToken.value);

    // where is that 10 coming from?!
    this.userservice.joinUser(user)
      .subscribe(f => {
        this.authService.completeAuth(f);
      },err => this.hasError = true);
  }
}
