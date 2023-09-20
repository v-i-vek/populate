import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { response, Router } from 'express';

import { LoginComponent } from '../login-signup/login.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AddDeviceComponent } from '../add-device/add-device.component'
import { DevicesService } from '../Services/devices.service';
import { CostExplorer } from 'aws-sdk';
import { DeviceDetailsComponent } from '../device-details/device-details.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
@Injectable()
export class DeliveryComponent implements OnInit {
  
  loaded:boolean = false
  tempData:Object ={}
  
  constructor(public http : DevicesService ,private dialog:MatDialog,){
    // setInterval(this.getAllDevices,30000)
    this.getAllDevices()
    this.http.RefreshRequired.subscribe(response=>{
      this.getAllDevices()
    })
    
    
   }
  ngOnInit(): void {

    console.log("====",this.deviceValue)
    console.log("laoded",this.loaded)
  }
  

  addDevice(){
    this.dialog.open( AddDeviceComponent,{
      width:'30%',
    })
  }
 
   deviceValue:any=1;
  
   getAllDevices(){
    this.http.getDevices().subscribe({
      next:(res:object)=>{
        // if(this.dialogRef && this.dialogRef.componentInstance){
        //   this.dialogRef.componentInstance.data = this.tempData
        // }
        console.log(res)
        this.deviceValue = res
        this.loaded = true;
        for(let device in this.deviceValue){
          console.log(this.deviceValue[device])
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
  

   checkDeviceDetailsOfDevices(data:any){
    this.dialog.open(DeviceDetailsComponent,{width:"90%",height:"80%",data:data})

   }

}
