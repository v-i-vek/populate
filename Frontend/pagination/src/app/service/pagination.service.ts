import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private baseUrl = 'http://localhost:3000/pagination';
  constructor(public http: HttpClient) {}
  paginatate(page: any, limit: any, search: any) :Observable<any> {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search.toString());
      console.log(params);
      

    return this.http.get<any>(`${this.baseUrl}`,{params});
  }
}
