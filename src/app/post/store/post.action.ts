import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.models";




export const addData = createAction("addData",props<{post:Post}>())