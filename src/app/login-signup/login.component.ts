import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from '../Services/signUp.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // variable for dynamic button
  login: boolean = true;
  loginSignBtn: String = 'Create account';
  alreadyAccountBtn: string = 'Log in';

  // form
  signUp = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  //constructor
  constructor(
    public http: ServicesService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public activatedRoute: ActivatedRoute,
    private router: Router,
   private nav:NavBarComponent,
   private dialog:MatDialogRef<LoginComponent>
    
  ) {
    console.log(editData);
  }

  ngOnInit(): void {
    if (this.editData) {
      this.loginSignBtn = 'Log in';
      this.alreadyAccountBtn = 'sign Up';
      this.login = !this.login;
    }
  }
  redirectEvent() {
    if (this.alreadyAccountBtn === 'Log in') {
      // this.router.navigate()
      
      this.dialog.close()
      this.nav.onLogin()
    }
    else{
      this.dialog.close()
      this.nav.onSignUp()
     
    }
  }

  //sending the value from form to
  signUpForm(value: any) {
    if(!this.editData){
    console.log(value);

    this.http.createUser(value).subscribe({
      next: (res) => {
        alert('Your Registration was successful');
        this.dialog.close()
        this.router.navigate(['/verify'],{queryParams:{id:value.email}})
        //this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        alert('something went wrong');
      },
    });
  }
  else{
    console.log(value,"the value of the login form")
    this.LoginForm(value)
  }
  }
  LoginForm(value:any){
    this.http.loginUser(value).subscribe({
      next:(res)=>{
        alert("user login successfully")
      },
      error:(e)=>{
        alert("something went wrong login failed")
      }
    })
  }
}
