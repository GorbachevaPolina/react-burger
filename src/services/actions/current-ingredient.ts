import { TIngredient } from "../types/ingredients";

export const STOP_VIEW_CURRENT_INGREDIENT: 'STOP_VIEW_CURRENT_INGREDIENT' = 'STOP_VIEW_CURRENT_INGREDIENT';
export const VIEW_CURRENT_INGREDIENT: "VIEW_CURRENT_INGREDIENT" = "VIEW_CURRENT_INGREDIENT"

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