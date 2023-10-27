import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStringName } from 'src/app/state/counter.selectors';
import {
  changeStringValue,
  customincrement,
  decrement,
  increment,
  reset,
} from 'src/app/state/counter.action';
import { CounterState } from 'src/app/state/counter.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss'],
})
export class CounterButtonsComponent implements OnInit {
  value!: number;
  changeStringValue$ !: Observable<string>;
  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit() {
    this.changeStringValue$ = this.store.select(getStringName)
  }
  onIncrement() {
    console.log("callieng")
    this.store.dispatch(increment());
  }
  onDecrement() {
    this.store.dispatch(decrement());
  }
  onReset() {
    this.store.dispatch(reset());
  }
  onCustom() {
    this.store.dispatch(customincrement({ value: this.value }));
  }

  changeString() {
    this.store.dispatch(changeStringValue())
  }
}
