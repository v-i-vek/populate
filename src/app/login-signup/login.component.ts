import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ServicesService } from '../Services/signUp.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // variable for dynamic button
  login: boolean = true;
  loginSignBtn:String = "Create account";
  alreadyAccountBtn :string="Log in"


  // form 
  signUp = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })


  //constructor
  constructor(public http: ServicesService, @Inject(MAT_DIALOG_DATA) public editData: any) {
    console.log(editData)
  }


  ngOnInit(): void {
    if (this.editData) {
      this.loginSignBtn="Log in"
      this.alreadyAccountBtn="sign Up"
      this.login = !this.login;
    }
  }
  
 




  //sending the value from form to  
  signUpForm(value: any) {

    console.log(value)
    this.http.createUser(value).subscribe({
      next: (res) => {
        alert("Your Registration was successful")
      },
      error: (e) => {
        alert("something went wrong")
      }
    })
  }

}
