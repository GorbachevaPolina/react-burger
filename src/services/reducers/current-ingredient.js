import { VIEW_CURRENT_INGREDIENT, STOP_VIEW_CURRENT_INGREDIENT, GET_CURRENT_INGREDIENT_FAILED, GET_CURRENT_INGREDIENT_REQUEST, GET_CURRENT_INGREDIENT_SUCCESS } from "../actions/current-ingredient"

const initialState = {
    currentIngredient: null,

    currentIngredientRequest: false,
    currentIngredientFailed: false
}

export const currentIngredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case VIEW_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.item
            }
        }
        case STOP_VIEW_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: null
            }
        }

        case GET_CURRENT_INGREDIENT_REQUEST: {
            return {
                ...state,
                currentIngredientRequest: true
            }
        }
        case GET_CURRENT_INGREDIENT_FAILED: {
            return {
                ...initialState
            }
        }
        case GET_CURRENT_INGREDIENT_SUCCESS: {
            return {
                currentIngredientFailed: false,
                currentIngredientRequest: false,
                currentIngredient: action.item
            }
        }
        default: {
            return state
        }
    }
}