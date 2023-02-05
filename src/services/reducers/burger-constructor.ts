import { ADD_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT, ADD_BUN, REMOVE_BUN, MOVE_INGREDIENT } from "../action-types/burger-constructer-actions"
import { TConstructorIngredient, TIngredient } from "../types/ingredients"
import { TConstructorActions } from "../actions/burger-constructor"

type TConstructorState = {
    bun: TIngredient | null;
    main: TConstructorIngredient[] | []
}

const initialState: TConstructorState = {
    bun: null,
    main: []
}

export const burgerConstructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
    switch(action.type) {
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                main: [
                    ...state.main,
                    {
                        ...action.item,
                        constructor_id: action.constructor_id
                    }
                ]
            }
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                main: state.main.filter(item => item.constructor_id !== action.constructor_id)
            }
        }
        case REMOVE_BUN: {
            return {
                ...state,
                bun: null
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.item
            }
        }
        case MOVE_INGREDIENT: {
            const tmp = [...state.main]
            tmp.splice(action.dragIndex, 1)
            tmp.splice(action.hoverIndex, 0, state.main[action.dragIndex])
            
            return {
                ...state,
                main: tmp
            } 
        }
        default: {
            return state;
        }
    }
}