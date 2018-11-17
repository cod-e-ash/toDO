import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserDetails } from '../../../models/user.model';
import { AuthDetail } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'lUsername': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'lPassword': new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]})
    });

    this.signUpForm = new FormGroup({
      'sUsername': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'sPassword': new FormControl(null, {validators: [Validators.required, Validators.minLength(6)]}),
      'sFirstName': new FormControl(null, {validators: [Validators.required]}),
      'sLastName': new FormControl(null, {validators: [Validators.required]})
    });

    // this.loginForm.setValue({lUsername: '', lPassword: ''});
    // this.signUpForm.reset();
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    // this.isLoading = true;
    const newUser: UserDetails = {
      userName: this.signUpForm.value.sUsername,
      firstName: this.signUpForm.value.sFirstName,
      lastName: this.signUpForm.value.sLastName
    };
    this.authService.createUser(newUser, this.signUpForm.value.sPassword);
    // this.signUpForm.reset();
  }

  onLogin() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    // this.isLoading = true;
    const newUser: AuthDetail = {
      userName: this.loginForm.value.lUsername,
      passWord: this.loginForm.value.lPassword,
    };
    this.authService.loginUser(newUser);
    // this.loginForm.reset();
  }

}
