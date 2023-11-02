import { createReducer ,on} from "@ngrx/store"
import { initialState } from "./post.state"
import { addData } from "./post.action"




const _postReducer = createReducer(initialState,on(addData,(state:any,action:any)=>{
    let addedData = {...action.post}
    addedData.id = (state.posts.length+1).toString()
   return {...state,posts:[...state.posts,addedData]}
}))



export function postReducer(state:any,action:any){
    return _postReducer(state,action)
}