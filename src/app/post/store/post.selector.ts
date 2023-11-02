import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.state";




export const getValuePost = createFeatureSelector<PostState>('posts')

export const getValue = createSelector(getValuePost,(state)=>{return state.posts})