import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { SigninSignupComponent } from '../layout/header/signin-signup/signin-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninSignupComponent, {
      width: 'auto',
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = localStorage.getItem('userId');
    const expirationTime = localStorage.getItem('userIdExpiration');
    if (!userId || !expirationTime || new Date(expirationTime) < new Date()) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userIdExpiration');
      this.openSignInDialog();
      return new Observable<boolean>((observer) => observer.next(false));
    } else {
      return new Observable<boolean>((observer) => observer.next(true));
    }
  }
}
