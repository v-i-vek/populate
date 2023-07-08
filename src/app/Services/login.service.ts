import { Injectable } from '@angular/core';
import { ServicesService } from './signUp.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient, private url:ServicesService) { }

  
  loginUser( value :any){
    return this.http.post(`${this.url.url}addUser`,value)
  }
  
}
