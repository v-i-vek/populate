import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
interface adminUserdata {
  users: any[];
}
interface adminTagsData {
  tags: any[];
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<adminUserdata>(`${this.baseUrl}/admin/getusers`);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}/admin/deleteuser/` + id);
  }


  addTag(tag: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/addtag`, tag);
  }

  getAllTags() {
    return this.http.get<adminTagsData>(`${this.baseUrl}/admin/getalltags`);
  }

  deleteTag(id: any) {
    return this.http.delete(`${this.baseUrl}/admin/deletetag/` + id);
  }
// forum
getQuestions() {
  return this.http.get<any>(`${this.baseUrl}/users/question`);
}

getAnswerById(id: any): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/users/answer/` + id);
}

deleteQuestion(id:any) {
  return this.http.delete<any>(`${this.baseUrl}/users/question/`+id);
}

deleteAnswer(id:any) {
  return this.http.delete<any>(`${this.baseUrl}/users/answer/`+id);
}

}
