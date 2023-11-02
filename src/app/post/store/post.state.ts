

import { Post } from "src/app/models/post.models";

export interface PostState{
    posts:Post[]
}

export const initialState:PostState ={
    posts: [
        {id:"1",title:"first title 1",description:"first description 1"},
        {id:"2",title:"first title 2",description:"first description 2"},
        {id:"3",title:"first title 3",description:"first description"}
]
}