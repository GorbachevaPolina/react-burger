import { URL } from "../../utils/url";

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';

export function getOrder(ingredients) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetch(`${URL}orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'ingredients': ingredients})
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                  } 
                  return Promise.reject(`Ошибка ${response.status}`)
            })
            .then((result) => dispatch({
                type: GET_ORDER_SUCCESS,
                order: result['order']['number']
            }))
            .catch((error) => dispatch({
                type: GET_ORDER_FAILED
            }))
    }
}