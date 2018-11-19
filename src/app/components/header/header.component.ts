import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  curUser = '';
  private curUserSub: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.curUser = this.authService.getAuthUser();
    this.curUserSub = this.authService.getCurUserListener()
    .subscribe((curUser: string) => {
      this.curUser = curUser;
    });
  }

  ngOnDestroy() {
    this.curUserSub.unsubscribe();
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }
}
