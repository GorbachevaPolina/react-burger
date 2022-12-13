import { ADD_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_INGREDIENT } from "../actions/burger-constructor"

const initialState = {
    allIngredients: [],
    bun: {},
    main: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                // allIngredients: [
                //     ...allIngredients,
                //     action.item
                // ]
            }
        }
        case REMOVE_CONSTRUCTOR_INGREDIENT: {
            return {

            }
        }
        default: {
            return state
        }
    }
}