import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../models/user.model';
import { AuthDetail } from '../models/auth.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {

    private token: string;
    private userName: string;
    private curUserSubject = new Subject<string>();
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) {}

    createUser(userDetails: UserDetails, passWord: string) {
        const newUser = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            userName: userDetails.userName,
            passWord: passWord};
       return this.http.post<{message: string,
        token: string,
        userName: string,
        err: any}>(this.apiUrl + '/users/signup', newUser)
        .pipe(map(rspData => {
            if (rspData.message === 'success') {
                this.token = rspData.token;
                this.userName = rspData.userName;
                this.emitSubjectEvent();
                localStorage.setItem('currentUser', JSON.stringify(rspData));
                return 'created and logged';
            } else {
                return 'err';
            }
        }));
    }

    loginUser(authDetails: AuthDetail) {
        return this.http.post<{
            message: string,
            token: string,
            userName: string,
            err: any}>(this.apiUrl + '/users/login', authDetails)
        .pipe(map(rspData => {
            console.log(rspData);
            if (rspData.message === 'success') {
                this.token = rspData.token;
                this.userName = rspData.userName;
                this.emitSubjectEvent();
                localStorage.setItem('currentUser', JSON.stringify(rspData));
                return 'logged';
            } else {
                return 'err';
            }
        }));
    }

    getAuthToken() {
        return this.token;
    }

    getAuthUser() {
        if (!this.userName || this.userName === '') {
            const curUser = JSON.parse(localStorage.getItem('currentUser'));
            if (curUser) {
                this.userName = curUser.userName;
                this.token = curUser.token;
            }
        }
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
        localStorage.removeItem('currentUser');
        // this.curUserSubject.complete();
    }

}
