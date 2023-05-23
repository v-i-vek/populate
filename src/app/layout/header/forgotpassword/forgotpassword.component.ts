import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ForgotpasswordComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ngxLoader: NgxUiLoaderService
  ) {}

  openForgotPasswordDialog(): void {
    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      width: 'auto',
    });
  }

  ngOnInit(): void {
    this.createForgotPassword();
  }
  createForgotPassword(): void {
    this.forgotPasswordForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
    });
  }
  onForgotPassword() {
    this.ngxLoader.start();
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (response) => {
        console.log(response);
        this.ngxLoader.stop();
        this.snackBar.open(response.message, 'Dismiss', commonSnackBarConfig);
        this.dialogRef.close();
      },
      (error) => {
        this.ngxLoader.stop();
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
  getErrorMessage(controlName: string) {
    const control = this.forgotPasswordForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (controlName === 'emailId' && control?.hasError('email')) {
      return 'Please enter valid EmailId';
    }

    return '';
  }
}
