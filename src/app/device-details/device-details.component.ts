import { Component, Inject, InjectionToken, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { DeliveryComponent } from '../delivery/delivery.component';
@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent  {
  temperature:number = 16;
  isOn:Boolean = true;
  status:String="on"


  
  decreaseTemperature(){
    this.temperature--
    if(this.temperature<=16){
      this.temperature = 16
    }
  }
  increaseTemperature(){
    this.temperature++;
    if(this.temperature >=30){
      this.temperature = 30
    }
  }
  setTemperature(val: number){
    console.log(val)
  }
  

  singleDeviceValue: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialogRef<DeliveryComponent>,formBuilder: FormBuilder
  ) {

    console.log("value of the edit data",editData)
    this.singleDeviceValue = editData;
    
  }
}
