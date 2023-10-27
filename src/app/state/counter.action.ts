import { createAction, props } from "@ngrx/store";



// identifier 
export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const reset = createAction('reset')

export const customincrement = createAction('customincrement',props<{value:number}>())
export const changeStringValue = createAction('changestring')