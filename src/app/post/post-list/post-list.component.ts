import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {Post} from '../../models/post.models'
import { addData } from '../store/post.action';
import { getValue } from '../store/post.selector';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent  implements OnInit{
 

  posts !:Observable<Post[]>
  constructor( private store : Store<{postState:any}>){
    console.log("hello world")
  }

  ngOnInit(): void {
    console.log("calledc");
    
    this.store.select(getValue).subscribe((data)=>{
  console.log("=====>",data)
})
  }
  


}
