import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST, INCREASE_COUNTER, DECREASE_COUNTER, TIngredientsActions } from "../actions/burger-ingredients"
import { TIngredient } from "../types/ingredients"

type TCounter = {
    [name: string]: number;
}

type TIngredientsState = {
    burgerIngredients: TIngredient[] | [];
    burgerIngredientsRequest: boolean;
    burgerIngredientsFailed: boolean;
    counter: TCounter | null
}

const initialState: TIngredientsState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false,
    counter: null
}

export const burgerIngredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
                burgerIngredients: action.ingredients,
                counter: action.ingredients.reduce((obj: TCounter, item) => (obj[item._id] = 0, obj) , {})
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                burgerIngredients: [],
                burgerIngredientsFailed: true,
                burgerIngredientsRequest: false
            }
        }
        case INCREASE_COUNTER: {
            return {
                ...state,
                counter: {
                    ...state.counter,
                    [action.id]: state!.counter![action.id] + 1
                }
            }
        }
        case DECREASE_COUNTER: {
            return {
                ...state,
                counter: {
                    ...state.counter,
                    [action.id]: state!.counter![action.id] - 1
                }
            }
        }
        default: {
            return state
        }
    }
}