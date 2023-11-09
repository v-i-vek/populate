import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { decrement, increment, reset } from '../store/post.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  value:number = 0 

  constructor(private store :Store<{counter:any}>){}

  onIncrement(){
    console.log("on increment is called")
   this.store.dispatch(increment())
  }
  onDecrement(){
    console.log("on decrement is called")
    this.store.dispatch(decrement())
  }
  onReset(){
    console.log("on reset is called")
    this.store.dispatch(reset())
  }
}
