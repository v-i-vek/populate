import { Component, Inject } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { LoginComponent } from '../login-signup/login.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AddDeviceComponent } from '../add-device/add-device.component'
import { DevicesService } from '../Services/devices.service';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  

  constructor(public http : DevicesService ,private dialog:MatDialog){
    this.getAllDevices()
    
    
   }
  

  addDevice(){
    this.dialog.open( AddDeviceComponent,{
      width:'30%',
    })
  }
 
   deviceValue:any;
  
   getAllDevices(){
    this.http.getDevices().subscribe({
      next:(res)=>{
        console.log(res)
        this.deviceValue = res
        for(let device in this.deviceValue){
          console.log(this.deviceValue[device])
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }

}
