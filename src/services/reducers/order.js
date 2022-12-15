import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/order"

const initialState = {
    order: 0,
    orderRequest: false,
    orderFailed: false
}

export const orderReducer = (state = initialState, action) => {
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
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }
        default: {
            return state
        }
    }
}