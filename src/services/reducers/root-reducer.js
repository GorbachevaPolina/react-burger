import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { currentIngredientReducer } from "./current-ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer
});