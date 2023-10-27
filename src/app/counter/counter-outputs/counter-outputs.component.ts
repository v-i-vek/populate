import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from 'src/app/state/counter.state';
import { getCounter } from 'src/app/state/counter.selectors';
// import { count } from 'console';

@Component({
  selector: 'app-counter-outputs',
  templateUrl: './counter-outputs.component.html',
  styleUrls: ['./counter-outputs.component.scss']
})
export class CounterOutputsComponent implements OnInit{
// @Input() counter:any;
counter !: number;

counter$ !: Observable<number>

constructor(private store: Store<{counter:CounterState}> ){
  
}
ngOnInit(){

 this.counter$ = this.store.select(getCounter)
}


}
