import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import {environment} from 'src/environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private _refreshRequired = new Subject<void>()
  
 get RefreshRequired(){
  return this._refreshRequired
 }

  private baseUrl = environment.baseUrl
 
  constructor(public http:HttpClient) { }
  
  provisionDevice(data: any){
    return this.http.post(`${this.baseUrl}/devices/addthing`,data).pipe(
      tap(()=>{this.RefreshRequired.next()})
    )
  }
  getDevices(){
    return this.http.get(`${this.baseUrl}/devices/getdevice/`)
  }
  postDeviceData(data:any,id:any){
    return this.http.post(`${this.baseUrl}/devices/publishthing/${id}`,data).pipe(tap(()=>{this.RefreshRequired.next()}))
  }
}
