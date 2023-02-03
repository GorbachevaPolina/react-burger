import { STOP_VIEW_CURRENT_INGREDIENT, VIEW_CURRENT_INGREDIENT } from "../action-types/current-ingredient-actions";
import { TIngredient } from "../types/ingredients";

export interface IStopViewCurrentIngredientAction {
    readonly type: typeof STOP_VIEW_CURRENT_INGREDIENT;
}

export interface IViewCurrentIngredientAction {
    readonly type: typeof VIEW_CURRENT_INGREDIENT;
    readonly item: TIngredient;
}

export type TCurrentIngredientActions = 
    IStopViewCurrentIngredientAction |
    IViewCurrentIngredientAction;