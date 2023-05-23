import { Component, OnInit } from '@angular/core';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css'],
})
export class SigninSignupComponent implements OnInit {
  isMobile!: boolean;
  selectedTabIndex = 0;
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  userRole: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SigninSignupComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninSignupComponent, {
      width: 'auto',
    });
  }
  openForgotPasswordDialog(): void {
    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      width: 'auto',
    });
  }
  public userId: any = localStorage.getItem('userId');

  ngOnInit(): void {
    this.createSignInForm();
    this.createSignUpForm();
  }

  createSignInForm(): void {
    this.signInForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  createSignUpForm(): void {
    const regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    const pswd = new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
    );
    this.signUpForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern("([A-Z][a-z]*)([\\s\\'-])*"),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.pattern("([A-Z][a-z]*)([\\s\\'-])*"),
          ],
        ],
        emailId: ['', [Validators.required, Validators.pattern(regex)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(pswd),
            Validators.minLength(6),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );
  }
  checkPasswords(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }
  onSignIn(): void {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe(
        (response) => {
          const expirationTime = new Date(Date.now() + 12 * 60 * 60 * 1000);
          localStorage.setItem('userId', response.data._id);
          localStorage.setItem(
            'userIdExpiration',
            expirationTime.toISOString()
          );
          localStorage.setItem('name', response.data.name);
          console.log(response);
          this.snackBar.open(response.message, 'Dismiss', commonSnackBarConfig);
          this.dialogRef.close();
          this.authService.isSignedIn = true;
          this.authService.authChanged.emit(true);
        },
        (error) => {
          this.snackBar.open(
            error.error.message,
            'Dismiss',
            commonSnackBarConfig
          );
        }
      );
    } else {
      return this.signInForm.markAllAsTouched();
    }
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open(
            response.message + ' Please Sign In to continue',
            'Dismiss',
            commonSnackBarConfig
          );
          this.selectedTabIndex = 0;
        },
        (error) => {
          this.snackBar.open(
            error.error.message,
            'Dismiss',
            commonSnackBarConfig
          );
        }
      );
    } else {
      this.snackBar.open(
        'Password not matched',
        'Dismiss',
        commonSnackBarConfig
      );
    }
  }

  onForgotPassword() {
    this.dialogRef.close();
    this.openForgotPasswordDialog();
  }
  getErrorMessage(controlName: string) {
    const control = this.signInForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (controlName === 'emailId' && control?.hasError('email')) {
      return 'Please enter valid EmailId';
    }
    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'Minimum length 6';
    }

    return '';
  }
  getErrorMessageS(controlName: string) {
    const control = this.signUpForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (controlName === 'firstName' && control?.hasError('pattern')) {
      return 'Ex:Tom';
    }
    if (controlName === 'lastName' && control?.hasError('pattern')) {
      return 'Ex:Holland';
    }
    if (controlName === 'emailId' && control?.hasError('pattern')) {
      return 'Enter valid EmailId';
    }
    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'Minimum length 6';
    }
    if (controlName === 'password' && control?.hasError('pattern')) {
      return '1 Number,specialChar & Capital Letter';
    }

    return '';
  }
}
