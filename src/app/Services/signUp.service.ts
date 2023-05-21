import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
url="localhost:3000/"
 
  constructor(public http:HttpClient) { }

  createUser( value :any){
    return this.http.post(`${this.url}addUser`,value)
  }
  
}
