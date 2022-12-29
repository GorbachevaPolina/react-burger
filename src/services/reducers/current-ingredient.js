import { STOP_VIEW_CURRENT_INGREDIENT, VIEW_CURRENT_INGREDIENT } from "../actions/current-ingredient"

const initialState = {
    currentIngredient: null
}

export const currentIngredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case STOP_VIEW_CURRENT_INGREDIENT: {
            return {
                currentIngredient: null
            }
        }
        case VIEW_CURRENT_INGREDIENT: {
            return {
                currentIngredient: action.item
            }
        }
        default: {
            return state
        }
    }
}