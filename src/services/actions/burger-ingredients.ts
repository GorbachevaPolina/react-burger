import { URL } from "../../utils/url";
import { checkResponse } from "../../utils/check-response";
import { TIngredient } from "../types/ingredients";
import { AppDispatch, AppThunk } from "../types/store";
import { 
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    INCREASE_COUNTER,
    DECREASE_COUNTER
} from "../action-types/burger-ingredients-actions";


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