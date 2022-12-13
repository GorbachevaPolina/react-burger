import { VIEW_CURRENT_INGREDIENT, STOP_VIEW_CURRENT_INGREDIENT } from "../actions/current-ingredient"

const initialState = {
    currentIngredient: {}
}

export const currentIngredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case VIEW_CURRENT_INGREDIENT: {
            return {
                currentIngredient: action.item
            }
        }
        case STOP_VIEW_CURRENT_INGREDIENT: {
            return {
                currentIngredient: {}
            }
        }
        default: {
            return state
        }
    }
}