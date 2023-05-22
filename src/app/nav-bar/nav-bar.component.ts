import { Component } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login-signup/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  data:number=1
  constructor(private dialog:MatDialog){}






//methods in html code are written below

//signup method code 
onSignUp(){
this.dialog.open(LoginComponent,{
  width:'30%',
})
}
// Login method
onLogin(){
  this.dialog.open(LoginComponent,{
    width:'30%',
    data:this.data,
  })
}
