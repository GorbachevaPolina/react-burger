import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { currentIngredientReducer } from "./current-ingredient";
import { orderReducer } from "./order";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    user: userReducer
});