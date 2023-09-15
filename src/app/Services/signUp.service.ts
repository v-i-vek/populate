import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
private baseUrl = environment.baseUrl
 
  constructor(public http:HttpClient) { }

  
}
