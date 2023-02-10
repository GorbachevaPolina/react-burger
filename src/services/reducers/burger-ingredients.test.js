import { burgerIngredientsReducer, initialState } from './burger-ingredients'
import * as types from '../action-types/burger-ingredients-actions'
import { main, bun } from '../../utils/ingredients-test-data'

describe('ingredients reducer', () => {
    it('should return initial state', () => {
        expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerIngredientsReducer(initialState, {
            type: types.GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            burgerIngredientsRequest: true
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(burgerIngredientsReducer({
            ...initialState,
            burgerIngredientsRequest: true
        }, {
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: [
                bun,
                main
            ]
        })).toEqual({
            burgerIngredientsRequest: false,
            burgerIngredientsFailed: false,
            burgerIngredients: [
                bun,
                main
            ],
            counter: {
                [bun._id]: 0,
                [main._id]: 0
            }
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(burgerIngredientsReducer({
            ...initialState,
            burgerIngredientsRequest: true
        }, {
            type: types.GET_INGREDIENTS_FAILED
        })).toEqual({
            ...initialState,
            burgerIngredientsFailed: true
        })
    })

    it('should handle INCREASE_COUNTER', () => {
        expect(burgerIngredientsReducer({
            ...initialState,
            burgerIngredients: [
                bun,
                main
            ],
            counter: {
                [bun._id]: 0,
                [main._id]: 0
            }
        }, {
            type: types.INCREASE_COUNTER,
            id: main._id
        })).toEqual({
            ...initialState,
            burgerIngredients: [
                bun,
                main
            ],
            counter: {
                [bun._id]: 0,
                [main._id]: 1
            }
        })
    })

    it('should handle DECREASE_COUNTER', () => {
        expect(burgerIngredientsReducer({
            ...initialState,
            burgerIngredients: [
                bun,
                main
            ],
            counter: {
                [bun._id]: 0,
                [main._id]: 1
            }
        }, {
            type: types.DECREASE_COUNTER,
            id: main._id
        })).toEqual({
            ...initialState,
            burgerIngredients: [
                bun,
                main
            ],
            counter: {
                [bun._id]: 0,
                [main._id]: 0
            }
        })
    })
})