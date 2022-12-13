import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "../actions/burger-ingredients"

const initialState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                burgerIngredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                burgerIngredientsRequest: false,
                burgerIngredientsFailed: false,
                burgerIngredients: action.ingredients
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                burgerIngredientsFailed: true,
                burgerIngredientsRequest: false
            }
        }
        default: {
            return state
        }
    }
}