import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Services/signUp.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  constructor(private route: ActivatedRoute,private http:ServicesService){}
  Id:any =''
  email:any = ''
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.Id = params.getAll('id'));
   this.email  = this.Id[0]
    
  }

  otpAuth = new FormGroup({
    otp: new FormControl(''),
    email:new FormControl('')
  });


otpVerify(value:any){
  this.otpAuth.value.email = this.email
// this.http.otpAuth(value).subscribe({
//   next:(res)=>{
//     alert("your email is verifed")

//   },
//   error:(err)=>{
//     alert("wrong otp")
//   }
// })
}
 
}
