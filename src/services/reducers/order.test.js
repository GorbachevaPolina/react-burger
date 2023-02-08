import { orderReducer } from "./order";
import * as types from "../action-types/order-actions"

const init = {
    order: 0,
    orderRequest: false,
    orderFailed: false
}

describe("order reducer", () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(init)
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(orderReducer(init, {
            type: types.GET_ORDER_REQUEST
        })).toEqual({
            ...init,
            orderRequest: true
        })
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(orderReducer({
            ...init,
            orderRequest: true
        }, {
            type: types.GET_ORDER_SUCCESS,
            order: 100
        })).toEqual({
            ...init,
            order: 100
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(orderReducer({
            ...init,
            orderRequest: true
        }, {
            type: types.GET_ORDER_FAILED
        })).toEqual({
            ...init,
            orderFailed: true
        })
    })
})