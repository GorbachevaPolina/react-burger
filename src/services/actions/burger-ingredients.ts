import { URL } from "../../utils/url";
import { checkResponse } from "../../utils/check-response";
import { TIngredient } from "../types/ingredients";
import { AppDispatch, AppThunk } from "../types/store";

export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const INCREASE_COUNTER: 'INCREASE_COUNTER' = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: 'DECREASE_COUNTER' = 'DECREASE_COUNTER';

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIncreaseCounterAction {
    readonly type: typeof INCREASE_COUNTER;
    readonly id: string;
}

export interface IDecreaseCounterAction {
    readonly type: typeof DECREASE_COUNTER;
    readonly id: string;
}

export type TIngredientsActions = 
    IGetIngredientsSuccessAction |
    IGetIngredientsFailedAction |
    IGetIngredientsRequestAction |
    IIncreaseCounterAction |
    IDecreaseCounterAction;

export function getIngredients(): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(`${URL}ingredients`)
            .then(checkResponse)
            .then((result) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: result.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}