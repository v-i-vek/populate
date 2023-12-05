import { createFeatureSelector, createSelector } from "@ngrx/store";
import { inital_value, page } from "./state";

export const getPaginateValue = createFeatureSelector<page>('pagevalue')

export const getPaginatedSelector = createSelector(getPaginateValue,(state)=>state)