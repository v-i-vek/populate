import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Question } from '../model/question';
import { Blog } from '../model/blog';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl =environment.baseUrl;
  constructor(private http: HttpClient) { }

getForumsById(id: string):Observable <Question> {
  return this.http.get<Question>(`${this.baseUrl}/users/questionbyuser/${id}`)
}

 // get a specific blog
 getForumById(id: string): Observable<Question> {
  return this.http.get<Question>(`${this.baseUrl}/users/question/` + id).pipe(
    map((response: any) => {
      return response.data;
    })
  );
}


updateForums(forum:Question
  ):Observable<Question>{
    return this.http.patch<Question>(`${this.baseUrl}/users/question/` +forum._id, forum).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

getUserBlogById(id:string):Observable <Blog> {
  return this.http.get<Blog>(`${this.baseUrl}/users/blogbyuser/${id}`)
}

 // get a specific blog
 getBlogById(id: string): Observable<Blog> {
  return this.http.get<Blog>(`${this.baseUrl}/users/blog/` + id).pipe(
    map((response: any) => {
      return response.data;
    })
  );
}

getmanageBookmarkById(id:string):Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/users/managebookmark/${id}`)
}


questionPagination(page: number, limit: number) {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<any>(`${this.baseUrl}/users/quepagination`, {
    params,
  });
}

getDocumentById(id: any):Observable<Document[]> {
  return this.http.get<Document[]>(`${this.baseUrl}/users/documentbyuser/${id}`).pipe(
    map((response: any) => {
      return response.data;
    })
  );
}

DeleteForumsById(questionId:any) {
 const url=`${this.baseUrl}/users/question/${questionId}`;
 return this.http.delete(url);
}


DeleteDocumentById(id:any) {
  const url=`${this.baseUrl}/users/document/${id}`;
  return this.http.delete(url);
 }


 deleteForumById(questionId:string):Observable<Question> {
  return this.http.delete<Question>(`${this.baseUrl}/users/question/` + questionId).pipe(
    map((response: any) => {
      return response.data;
    })
  );
}

 updateBlogs(blog:Blog
  ):Observable<Blog>{
    return this.http.patch<Blog>(`${this.baseUrl}/users/blog/` +blog._id, blog).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

 }
