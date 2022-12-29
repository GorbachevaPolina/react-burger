import { URL } from "../../utils/url";
import { checkResponse } from "../../utils/check-response";

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

export function getIngredients() {
    return function(dispatch) {
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