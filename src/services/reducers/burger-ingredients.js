import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "../actions/burger-ingredients"
import { ADD_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT, ADD_BUN, REMOVE_BUN } from "../actions/burger-constructor"

const initialState = {
    burgerIngredients: [],
    burgerIngredientsRequest: false,
    burgerIngredientsFailed: false,

    constructorIngredients: [],
    bun: {},
    main: []
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
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients,
                    state.burgerIngredients.find(item => item._id === action.id)
                ],
                main: [
                    ...state.main,
                    state.burgerIngredients.find(item => item._id === action.id)
                ]
            }
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].filter(item => item._id !== action.id),
                main: [...state.main].filter(item => item._id !== action.id)
            }
        }
        case REMOVE_BUN: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].filter(item => item._id !== action.id),
                bun: {}
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                constructorIngredients: [
                    ...state.constructorIngredients,
                    state.burgerIngredients.find(item => item._id === action.id)
                ],
                bun: state.burgerIngredients.find(item => item._id === action.id)
                
            }
        }
        default: {
            return state
        }
    }
}