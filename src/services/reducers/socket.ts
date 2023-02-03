import { TWSActions, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/socket"
import { TOrder } from "../types/order";

type TWSState = {
    wsConnected: boolean;
    messages: TOrder | null;

    error?: Event;
}

const initialState: TWSState = {
    wsConnected: false,
    messages: null
}

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: undefined,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                messages: null,
                error: undefined,
                wsConnected: false
            }
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                error: undefined,
                messages: JSON.parse(action.payload)
            }
        }
        default: {
            return state
        }
    }
}