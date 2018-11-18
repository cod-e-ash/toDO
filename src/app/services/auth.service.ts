import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../models/user.model';
import { AuthDetail } from '../models/auth.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private token: string;
    private userName: string;
    private curUserSubject = new Subject<string>();

    constructor(private http: HttpClient, private router: Router) {}

    createUser(userDetails: UserDetails, passWord: string) {
        const newUser = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            userName: userDetails.userName,
            passWord: passWord};
        this.http.post<{message: string, token: string, userName: string, err: any}>('http://localhost:3000/api/users/signup', newUser)
        .subscribe(rspData => {
            if (rspData.message === 'success') {
                this.token = rspData.token;
                this.userName = rspData.userName;
                this.router.navigate(['']);
                this.emitSubjectEvent();
            }
        });
        if (this.userName === '') {
            return 'err';
        }
    }

    loginUser(authDetails: AuthDetail) {
        this.http.post<{message: string, token: string, userName: string, err: any}>('http://localhost:3000/api/users/login', authDetails)
        .subscribe(rspData => {
            if (rspData.message === 'success') {
                this.token = rspData.token;
                this.userName = rspData.userName;
                this.router.navigate(['']);
                this.emitSubjectEvent();
                return 'logged';
            }
        });
        if (!this.userName || this.userName === '') {
            return 'err';
        }
    }

    getAuthToken() {
        return this.token;
    }

    getAuthUser() {
        return this.userName;
    }

    emitSubjectEvent() {
      this.curUserSubject.next(this.userName);
    }

    getCurUserListener() {
      return this.curUserSubject.asObservable();
    }

    logoutUser() {
        this.token = null;
        this.userName = null;
        this.emitSubjectEvent();
        // this.curUserSubject.complete();
    }

}
