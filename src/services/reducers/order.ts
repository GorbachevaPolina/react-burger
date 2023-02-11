import { TOrderActions } from "../actions/order"
import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from '../action-types/order-actions'

type TOrderState = {
    order: number;
    orderRequest: boolean;
    orderFailed: boolean;
}

export const initialState: TOrderState = {
    order: 0,
    orderRequest: false,
    orderFailed: false
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                order: action.order,
                orderFailed: false,
                orderRequest: false
            }
        }
        case GET_ORDER_FAILED: {
            return {
                order: 0,
                orderFailed: true,
                orderRequest: false
            }
        }
        default: {
            return state
        }
    }
}