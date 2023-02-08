import { burgerIngredientsReducer } from './burger-ingredients'
import * as types from '../action-types/burger-ingredients-actions'

const init = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false,
    counter: null
}

describe('ingredients reducer', () => {
    it('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(init)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerIngredientsReducer(init, {
            type: types.GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...init,
            burgerIngredientsRequest: true
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(burgerIngredientsReducer({
            ...init,
            burgerIngredientsRequest: true
        }, {
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: [
                {
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
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                 }
            ]
        })).toEqual({
            burgerIngredientsRequest: false,
            burgerIngredientsFailed: false,
            burgerIngredients: [
                {
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
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                 }
            ],
            counter: {
                "60666c42cc7b410027a1a9b1": 0,
                "60666c42cc7b410027a1a9b5": 0
            }
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(burgerIngredientsReducer({
            ...init,
            burgerIngredientsRequest: true
        }, {
            type: types.GET_INGREDIENTS_FAILED
        })).toEqual({
            ...init,
            burgerIngredientsFailed: true
        })
    })

    it('should handle INCREASE_COUNTER', () => {
        expect(burgerIngredientsReducer({
            ...init,
            burgerIngredients: [
                {
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
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                 }
            ],
            counter: {
                "60666c42cc7b410027a1a9b1": 0,
                "60666c42cc7b410027a1a9b5": 0
            }
        }, {
            type: types.INCREASE_COUNTER,
            id: "60666c42cc7b410027a1a9b5"
        })).toEqual({
            ...init,
            burgerIngredients: [
                {
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
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                 }
            ],
            counter: {
                "60666c42cc7b410027a1a9b1": 0,
                "60666c42cc7b410027a1a9b5": 1
            }
        })
    })

    it('should handle DECREASE_COUNTER', () => {
        expect(burgerIngredientsReducer({
            ...init,
            burgerIngredients: [
                {
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
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                 }
            ],
            counter: {
                "60666c42cc7b410027a1a9b1": 0,
                "60666c42cc7b410027a1a9b5": 1
            }
        }, {
            type: types.DECREASE_COUNTER,
            id: "60666c42cc7b410027a1a9b5"
        })).toEqual({
            ...init,
            burgerIngredients: [
                {
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
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                    "type":"main",
                    "proteins":800,
                    "fat":800,
                    "carbohydrates":300,
                    "calories":2674,
                    "price":3000,
                    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v":0
                 }
            ],
            counter: {
                "60666c42cc7b410027a1a9b1": 0,
                "60666c42cc7b410027a1a9b5": 0
            }
        })
    })
})