import { URL } from "../../utils/url";

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
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } 
                return Promise.reject(`Ошибка ${response.status}`)
            })
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