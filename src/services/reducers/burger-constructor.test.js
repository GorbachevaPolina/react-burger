import { burgerConstructorReducer, initialState} from './burger-constructor'
import * as types from '../action-types/burger-constructer-actions'
import { main, bun, uuid } from '../../utils/ingredients-test-data'

describe('constructor reducer', () => {
    it('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
        expect(
            burgerConstructorReducer(initialState, {
                type: types.ADD_CONSTRUCTOR_INGREDIENT,
                item: main,
                constructor_id: uuid
            })
        ).toEqual({
            bun: null,
            main: [
                {
                    ...main,
                    "constructor_id": uuid
                }
            ]
        })
    })

    it('should handle REMOVE_CONSTRUCTOR_INGREDIENT', () => {
        expect(burgerConstructorReducer({
            bun: null,
            main: [
                {
                    ...main,
                    "constructor_id": uuid
                }
            ]
        }, {
            type: types.REMOVE_CONSTRUCTOR_INGREDIENT,
            constructor_id: uuid
        })).toEqual(initialState)
    })

    it('should handle ADD_BUN', () => {
        expect(burgerConstructorReducer(initialState, {
            type: types.ADD_BUN,
            item: bun
        })).toEqual({
            bun: bun,
            main: []
        })
    })

    it('should handle REMOVE_BUN', () => {
        expect(burgerConstructorReducer({
                bun: bun,
                main: []
            }, {
            type: types.REMOVE_BUN
        })).toEqual(initialState)
    })
})