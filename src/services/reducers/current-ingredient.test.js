import { currentIngredientReducer, initialState } from "./current-ingredient";
import * as types from '../action-types/current-ingredient-actions'
import { bun } from "../../utils/ingredients-test-data";

describe('current ingredient reducer', () => {
    it('should return initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle VIEW_CURRENT_INGREDIENT', () => {
        expect(currentIngredientReducer(initialState, {
            type: types.VIEW_CURRENT_INGREDIENT,
            item: bun
        })).toEqual({
            currentIngredient: bun
        })
    })

    it('should handle STOP_VIEW_CURRENT_INGREDIENT', () => {
        expect(currentIngredientReducer({
            currentIngredient: bun
        }, {
            type: types.STOP_VIEW_CURRENT_INGREDIENT
        })).toEqual(initialState)
    })
})