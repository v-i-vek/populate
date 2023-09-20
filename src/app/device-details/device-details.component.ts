import { Component, Inject, InjectionToken, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { DevicesService } from '../Services/devices.service';
@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
})
export class DeviceDetailsComponent {
  temperature: number = Number(this.editData.temperature);
  isOn: Boolean = true;
  status: String = this.editData.status.toUpperCase();
  mode:String= this.editData.mode
  btnColor: String = this.status === 'ON' ? 'primary' : 'warn';
  singleDeviceValue: any;

  data: any = {
    temperature: this.temperature.toString(),
    status: this.status,
    mode: 'cool',
    origin: 'client',
  };

  decreaseTemperature() {
    this.temperature--;
    if (this.temperature <= 16) {
      this.temperature = 16;
    }
  }
  increaseTemperature() {
    this.temperature++;
    if (this.temperature >= 30) {
      this.temperature = 30;
    }
  }
  setTemperature(val: number) {
    this.data.temperature = val.toString();
    this.postingTheDeviceData();
  }
  // to toogle the ON/OFF button of the ac
  statusOfAc() {
    if (this.status === 'OFF') {
      this.status = 'ON';
      this.btnColor = 'primary';
      this.data.status = this.status;
      this.postingTheDeviceData();
    } else {
      this.status = 'OFF';
      this.btnColor = 'warn';
      this.data.status = this.status;
      this.postingTheDeviceData();
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialogRef<DeliveryComponent>,
    formBuilder: FormBuilder,
    private http: DevicesService
  ) {
    console.log('Ac is turned OFf', this.status);
    console.log('value of the edit data', editData);
    this.singleDeviceValue = editData;
  }

  postingTheDeviceData() {
    console.log('this.data ', this.data);
    console.log(this.data, this.editData.deviceId);
    this.http.postDeviceData(this.data, this.editData.deviceId).subscribe({
      next: (res) => {
        console.log('data posted', res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  changeMode( ){
    if(this.mode === "cool"){
      console.log("cool is called")
      this.mode = "fan"
    }
    else if(this.mode ==="fan"){
      console.log("else if is called")

      this.mode = "auto"
    }
    else{
      console.log("else is called")

      this.mode = "cool"
    }
  }
  confirmChangeModeAndPost(){
    this.data.mode = this.mode
    this.postingTheDeviceData();

  }
}
