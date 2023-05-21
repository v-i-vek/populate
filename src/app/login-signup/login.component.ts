import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms'
import { ServicesService } from '../Services/signUp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public http: ServicesService){}


signUp = new FormGroup({
  name:new FormControl(''),
  email:new FormControl(''),
  password :new FormControl(''),
  confirmPassword : new FormControl('')
})


//sending the value from form to  
signUpForm(value:any){
  console.log(value)
this.http.createUser(value).subscribe({
  next:(res)=>{
    alert("Your Registration was successful")
  },
  error:(e)=>{
    alert("something went wrong")
  }
})
}

}
