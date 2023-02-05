import { STOP_VIEW_CURRENT_INGREDIENT, VIEW_CURRENT_INGREDIENT } from "../action-types/current-ingredient-actions";
import { TCurrentIngredientActions } from "../actions/current-ingredient"
import { TIngredient } from "../types/ingredients"

type TCurrentIngredientState = {
    currentIngredient: TIngredient | null;
}

const initialState: TCurrentIngredientState = {
    currentIngredient: null
}

export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
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