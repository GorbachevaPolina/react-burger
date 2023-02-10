import { burgerConstructorReducer, initialState} from './burger-constructor'
import * as types from '../action-types/burger-constructer-actions'

describe('constructor reducer', () => {
    it('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
        expect(
            burgerConstructorReducer(initialState, {
                type: types.ADD_CONSTRUCTOR_INGREDIENT,
                item: {
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
                 },
                constructor_id: '54e6fc0e-dd7b-4ee5-8718-25a040da4a41'
            })
        ).toEqual({
            bun: null,
            main: [
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
                    "__v":0,
                    "constructor_id": '54e6fc0e-dd7b-4ee5-8718-25a040da4a41'
                }
            ]
        })
    })

    it('should handle REMOVE_CONSTRUCTOR_INGREDIENT', () => {
        expect(burgerConstructorReducer({
            bun: null,
            main: [
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
                    "__v":0,
                    "constructor_id": '54e6fc0e-dd7b-4ee5-8718-25a040da4a41'
                }
            ]
        }, {
            type: types.REMOVE_CONSTRUCTOR_INGREDIENT,
            constructor_id: '54e6fc0e-dd7b-4ee5-8718-25a040da4a41'
        })).toEqual(initialState)
    })

    it('should handle ADD_BUN', () => {
        expect(burgerConstructorReducer(initialState, {
            type: types.ADD_BUN,
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
            bun: {
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
            main: []
        })
    })

    it('should handle REMOVE_BUN', () => {
        expect(burgerConstructorReducer({
                bun: {
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
                main: []
            }, {
            type: types.REMOVE_BUN
        })).toEqual(initialState)
    })
})