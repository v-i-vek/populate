import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Http } from 'aws-sdk/clients/xray';
import { DeliveryComponent } from '../delivery/delivery.component';
import { DevicesService } from '../Services/devices.service';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit{


  constructor(public http: DevicesService   ,  private dialog:MatDialogRef<DeliveryComponent>){}


  ngOnInit(): void {
    
  }
  provisionDevice = new FormGroup({
    thingName: new FormControl(''),
    location: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  addDevices(value:any){
    this.http.provisionDevice(value).subscribe({
      next: (res) => {
            alert('Your Registration was successful');
            console.log("register successfully",res)
            this.dialog.close()
          },
          error: (e) => {
            console.log(e)
            alert('something went wrong');
          },
      
    })
    }
}


