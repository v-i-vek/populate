import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Post} from '../../models/post.models'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent  implements OnInit{
 

  posts !:Observable<Post[]>
  constructor( private store : Store<>){}

  ngOnInit(): void {
    
  }
  


}
