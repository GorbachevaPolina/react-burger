import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "../actions/burger-ingredients"
import { ADD_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT, ADD_BUN, REMOVE_BUN, MOVE_INGREDIENT } from "../actions/burger-constructor"

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
                    {
                        ...state.burgerIngredients.find(item => item._id === action.id),
                        constructor_id: action.constructor_id
                    }
                ],
                main: [
                    ...state.main,
                    {
                        ...state.burgerIngredients.find(item => item._id === action.id),
                        constructor_id: action.constructor_id
                    }
                ]
            }
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients].filter(item => item.constructor_id !== action.constructor_id),
                main: [...state.main].filter(item => item.constructor_id !== action.constructor_id)
            }
        }
        case REMOVE_BUN: {
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter(item => item.type !== 'bun'),
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
        case MOVE_INGREDIENT: {
            const tmp = state.main.filter((item, idx) => idx !== action.dragIndex)
            return {
                ...state,
                main: [...tmp.slice(0, action.hoverIndex), state.main[action.dragIndex], ...tmp.slice(action.hoverIndex)]
            } 
        }
        default: {
            return state
        }
    }
}