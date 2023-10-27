import { createReducer, on } from '@ngrx/store';
import { changeStringValue, customincrement, decrement, increment, reset } from './counter.action';
import { intialState } from './counter.state';

const _counterReducer = createReducer(
  intialState,
  on(increment, (state) => {
    return { ...state, counter: state.counter + 1 };
  }),on(decrement,(state)=>{ return {...state , counter:state.counter-1}})
  
  ,on(reset,(state)=>{return {...state,counter: 0}}),on(customincrement,(state,action)=>{ console.log(action)
    return { ...state, counter: state.counter+action.value}}),on(changeStringValue,(state)=>{
      return {...state, changeString : 'modified string'}
    })
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
