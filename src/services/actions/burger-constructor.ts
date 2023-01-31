import { TIngredient } from "../types/ingredients"

export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' = 'ADD_CONSTRUCTOR_INGREDIENT'
export const REMOVE_CONSTRUCTOR_INGREDIENT: 'REMOVE_CONSTRUCTOR_INGREDIENT' = 'REMOVE_CONSTRUCTOR_INGREDIENT'
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN'
export const REMOVE_BUN: 'REMOVE_BUN' = 'REMOVE_BUN'
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT'

export interface IAddConstructorIngredientAction {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    readonly item: TIngredient;
    readonly constructor_id: string;
}

export interface IRemoveConstructorIngredientAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
    readonly constructor_id: string;
}

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly item: TIngredient;
}

export interface IRemoveBunAction {
    readonly type: typeof REMOVE_BUN;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export type TConstructorActions = 
    IAddConstructorIngredientAction |
    IRemoveConstructorIngredientAction |
    IAddBunAction |
    IRemoveBunAction |
    IMoveIngredientAction; 