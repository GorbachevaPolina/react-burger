import  { URL } from '../../utils/url'

export const VIEW_CURRENT_INGREDIENT = 'VIEW_CURRENT_INGREDIENT';
export const STOP_VIEW_CURRENT_INGREDIENT = 'STOP_VIEW_CURRENT_INGREDIENT';

export const GET_CURRENT_INGREDIENT_REQUEST = "GET_CURRENT_INGREDIENT_REQUEST"
export const GET_CURRENT_INGREDIENT_FAILED = "GET_CURRENT_INGREDIENT_FAILED";
export const GET_CURRENT_INGREDIENT_SUCCESS = "GET_CURRENT_INGREDIENT_SUCCESS"

export function getCurrentIngredient(id) {
        return function(dispatch) {
            dispatch({
                type: GET_CURRENT_INGREDIENT_REQUEST
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
                        type: GET_CURRENT_INGREDIENT_SUCCESS,
                        item: result.data.find((item) => item._id === id)
                    })
                })
                .catch((error) => {
                    dispatch({
                        type: GET_CURRENT_INGREDIENT_FAILED
                    })
                })
        }
    }
