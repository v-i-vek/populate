import { createAction, createFeatureSelector, props } from "@ngrx/store"

const Page_api_is_called = "[page api is called] this is the page api"
const Page_api_is_called_success = "[page api is successfully called] and stored in store"


export const onCallOfPage = createAction(Page_api_is_called,props<{data:any}>());
export const onSuccessCallOfPage = createAction(Page_api_is_called_success,props<{data:any}>());
