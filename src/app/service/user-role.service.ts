import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private baseUrl =environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {}

  getUserRole(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/userrole/`+ id);
  }
}
