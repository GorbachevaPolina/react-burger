import { wsReducer, initialState } from "./socket";
import * as types from '../action-types/socket-actions'

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
            payload: JSON.stringify({
                "success": true,
                "orders": [
                  {
                    "ingredients": [
                      "60d3463f7034a000269f45e7",
                      "60d3463f7034a000269f45e9",
                      "60d3463f7034a000269f45e8",
                      "60d3463f7034a000269f45ea"
                    ],
                    "_id": "",
                    "status": "done",
                    "number": 0,
                    "createdAt": "2021-06-23T14:43:22.587Z",
                    "updatedAt": "2021-06-23T14:43:22.603Z"
                  }
                ],
                "total": 1,
                "totalToday": 1
              })
        })).toEqual({
            wsConnected: true,
            error: undefined,
            messages: {
                "success": true,
                "orders": [
                  {
                    "ingredients": [
                      "60d3463f7034a000269f45e7",
                      "60d3463f7034a000269f45e9",
                      "60d3463f7034a000269f45e8",
                      "60d3463f7034a000269f45ea"
                    ],
                    "_id": "",
                    "status": "done",
                    "number": 0,
                    "createdAt": "2021-06-23T14:43:22.587Z",
                    "updatedAt": "2021-06-23T14:43:22.603Z"
                  }
                ],
                "total": 1,
                "totalToday": 1
              } 
        })
    })
})