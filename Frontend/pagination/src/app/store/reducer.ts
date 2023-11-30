import { createReducer, on } from "@ngrx/store"
import { onSuccessCallOfPage } from "./selector"
import { inital_value } from "./state"


const _reducer = createReducer(inital_value,on(onSuccessCallOfPage,(state:any,action:any)=>{
    return { ... state, page:action.page}
}))


export function reducer(state:any,action:any){
    return _reducer(state,action)
}