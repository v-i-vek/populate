import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from '../model/document';
import { AllDocument } from '../model/all-document';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //post a new Document
  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    return this.http.post(`${this.baseUrl}/users/document`, formData).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  //get all documents
  getAllDoc(pageNumber: number, pageSize: number): Observable<AllDocument[]> {
    return this.http.get<AllDocument[]>(`${this.baseUrl}/users/document?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getAllAdminDoc(pageNumber: number, pageSize: number): Observable<AllDocument[]> {
    return this.http.get<AllDocument[]>(`${this.baseUrl}/admin/document?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // get a specific blog
  getDocumentById(_id: string): Observable<Document> {
    const url = `${this.baseUrl}/users/document/${_id}`;
    return this.http.get<Document>(url).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }

  deleteDocumentById(id: string): Observable<Document> {
    return this.http
      .delete<Document>(`${this.baseUrl}/users/document/` + id)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
  //approve document
  approveDocument(id: string): Observable<Document> {
    const body = { isApproved: true };
    return this.http
      .patch<Document>(`${this.baseUrl}/admin/approvedoc/` + id, body)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
