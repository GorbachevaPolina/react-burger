import { orderReducer, initialState } from "./order";
import * as types from "../action-types/order-actions"

describe("order reducer", () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: types.GET_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(orderReducer({
            ...initialState,
            orderRequest: true
        }, {
            type: types.GET_ORDER_SUCCESS,
            order: 100
        })).toEqual({
            ...initialState,
            order: 100
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(orderReducer({
            ...initialState,
            orderRequest: true
        }, {
            type: types.GET_ORDER_FAILED
        })).toEqual({
            ...initialState,
            orderFailed: true
        })
    })
})