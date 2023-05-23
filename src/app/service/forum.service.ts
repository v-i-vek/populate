import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  // private bookmarks$ = new BehaviorSubject<Bookmark[]>([]);
  constructor(private http: HttpClient) {}
  private baseUrl = environment.baseUrl;
  getQuestions() {
    return this.http.get<any>(`${this.baseUrl}/users/question`);
  }

  questionPagination(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.baseUrl}/users/quepagination`, {
      params,
    });
  }

  postQuestion(data: any) {
    return this.http.post<any>(`${this.baseUrl}/users/question`, data);
  }

  postAnswer(data: any) {
    return this.http.post<any>(`${this.baseUrl}/users/answer`, data);
  }

  getQuestionById(id: any) {
    return this.http.get<any>(`${this.baseUrl}/users/question/` + id);
  }

  getAnswerById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/answer/` + id);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/getalltags`);
  }

  addRemoveBookmark(data: any) {
    return this.http.post<any>(`${this.baseUrl}/users/bookmark`, data);
  }

  getBookmarkByUserId(userId: any) {
    return this.http.get<any>(`${this.baseUrl}/users/bookmark/` + userId);
  }

  upvotesAnswer(id: any, data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/users/upvote/${id}`,
      data
    );
  }

  downvotesAnswer(id: any, data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/users/downvote/${id}`,
      data
    );
  }

  searchQuestion(query: any) {
    return this.http.get<any>(
      `${this.baseUrl}/users/search?question=` + query
    );
  }

  getBlogTitle(){
    return this.http.get<any>(`${this.baseUrl}/users/blogtitle`);
  }
}
