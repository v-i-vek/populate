import { createReducer, on } from "@ngrx/store";
import { initalState } from "./post.state";
import { decrement, increment, reset } from "./post.action";


const _counterReducer = createReducer(initalState,on(increment,(state)=>{
    console.log("on increment from the state");
    
    return {...state, counter:state.counter+1}
}),on(decrement,(state)=>{
    return {...state, counter:state.counter-1}
}),on(reset,(state)=>{
    return {...state,counter:0}
})
)



export  function counterReducer(state:any, action:any){
 return _counterReducer(state,action)
}