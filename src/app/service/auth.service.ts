import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { commonSnackBarConfig } from './snackbar-config.service';
import { SigninSignupComponent } from '../layout/header/signin-signup/signin-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  public isSignedIn: boolean = false;
  authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isUserAuthenticated(): boolean {
    const userId = localStorage.getItem('userId');
    const expirationTime = localStorage.getItem('userIdExpiration');
    if (!userId || !expirationTime || new Date(expirationTime) < new Date()) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userIdExpiration');
      return false;
    } else {
      this.isAuthenticatedSubject.next(true);
      return true;
    }
  }
  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninSignupComponent, {
      width: 'auto',
    });
  }
  signIn(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/signin`, payload, {withCredentials: true});
  }

  signUp(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  forgotPassword(emailId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgotpassword`, emailId);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/forgotpassword/reset-password/`,
      data
    );
  }
  signOut(data: any): Observable<any> {
    localStorage.removeItem('userId');
    localStorage.removeItem('userIdExpiration');
    localStorage.removeItem('name');
    return this.http.post(`${this.baseUrl}/users/signout`, data);
  }
}
