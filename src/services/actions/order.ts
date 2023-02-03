import { URL } from "../../utils/url";
import { checkResponse } from "../../utils/check-response";
import { AppDispatch, AppThunk } from "../types/store";
import { GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_REQUEST } from "../action-types/order-actions";

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: number;
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export type TOrderActions =
    IGetOrderFailedAction |
    IGetOrderRequestAction |
    IGetOrderSuccessAction;

export function getOrder(ingredients: string[], token: string): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetch(`${URL}orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({'ingredients': ingredients})
        })
            .then(checkResponse)
            .then((result) => dispatch({
                type: GET_ORDER_SUCCESS,
                order: result['order']['number']
            }))
            .catch((error) => dispatch({
                type: GET_ORDER_FAILED
            }))
    }
}