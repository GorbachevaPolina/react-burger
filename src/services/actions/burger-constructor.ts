import { 
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    ADD_BUN,
    REMOVE_BUN,
    MOVE_INGREDIENT
} from "../action-types/burger-constructer-actions";
import { TIngredient } from "../types/ingredients"


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