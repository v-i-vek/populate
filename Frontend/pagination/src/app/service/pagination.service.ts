import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private baseUrl = 'http://localhost:3000/pagination';
  constructor(public http: HttpClient) {}
  paginatate(page: any, limit: any, search: any) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search', search.toString());

    return this.http.get(`${this.baseUrl}`,{params});
  }
}
