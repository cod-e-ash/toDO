import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../models/user.model';
import { AuthDetail } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {}

    createUser(userDetails: UserDetails, passWord: string) {
        const newUser = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            userName: userDetails.userName,
            passWord: passWord};
        this.http.post<{message: string, err: any}>('http://localhost:3000/api/users/signup', newUser)
        .subscribe(rspData => {
            if (rspData.message === 'success') {
                console.log('User Created');
            } else {
                console.log(rspData.err);
            }
        });
    }

    loginUser(authDetails: AuthDetail) {
        this.http.post<{message: string, token: any, err: any}>('http://localhost:3000/api/users/login', authDetails)
        .subscribe(rspData => {
            if (rspData.message === 'success') {
                console.log('Login Successful');
                console.log(rspData);
                this.router.navigate(['/']);
            } else {
                console.log(rspData);
            }
        });
    }
}
