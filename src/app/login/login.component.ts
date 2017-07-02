import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  hasError: boolean;

  constructor(fb: FormBuilder, private authService: AuthService) { 
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })

    this.email = this.loginForm.controls['email']
    this.password = this.loginForm.controls['password']
  }

  ngOnInit() {
  }

  onSubmit(value: FormGroup) : void {

    let em = value['email']
    let pass = this.authService.hash(value['password']);

    this.hasError = false;

    this.authService.authenticate(em, pass)
    .subscribe(ok => this.authService.completeAuth(ok), err => this.hasError = true);    
  }

}
