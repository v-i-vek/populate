import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private baseUrl = environment.baseUrl
 
  constructor(public http:HttpClient) { }

  provisionDevice(data: any){
    return this.http.post(`${this.baseUrl}/devices/addthing`,data)
  }
  getDevices(){
    return this.http.get(`${this.baseUrl}/devices/getdevice/`)
  }
}
