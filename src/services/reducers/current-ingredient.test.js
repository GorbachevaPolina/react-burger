import { currentIngredientReducer, initialState } from "./current-ingredient";
import * as types from '../action-types/current-ingredient-actions'

describe('current ingredient reducer', () => {
    it('should return initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle VIEW_CURRENT_INGREDIENT', () => {
        expect(currentIngredientReducer(initialState, {
            type: types.VIEW_CURRENT_INGREDIENT,
            item: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            }
        })).toEqual({
            currentIngredient: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            }
        })
    })

    it('should handle STOP_VIEW_CURRENT_INGREDIENT', () => {
        expect(currentIngredientReducer({
            currentIngredient: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
            }
        }, {
            type: types.STOP_VIEW_CURRENT_INGREDIENT
        })).toEqual(initialState)
    })
})