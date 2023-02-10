import { wsReducer, initialState } from "./socket";
import * as types from '../action-types/socket-actions'
import { order } from "../../utils/order-test-data";

describe('ws reducer', () => {
    it('should return initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_ERROR,
            payload: "error"
        })).toEqual({
            ...initialState,
            error: 'error'
        })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer({
            ...initialState,
            wsConnected: true
        }, {
            type: types.WS_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            error: undefined
        })
    })

    it('should handle WS_GET_MESSAGE', () => {
        expect(wsReducer({
            ...initialState,
            wsConnected: true
        }, {
            type: types.WS_GET_MESSAGE,
            payload: JSON.stringify(order)
        })).toEqual({
            wsConnected: true,
            error: undefined,
            messages: order 
        })
    })
})