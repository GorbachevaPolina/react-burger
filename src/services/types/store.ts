import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TConstructorActions } from '../actions/burger-constructor';
import { TIngredientsActions } from '../actions/burger-ingredients';
import { TCurrentIngredientActions } from '../actions/current-ingredient'
import { store } from '../../index';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/socket';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = 
    TConstructorActions |
    TIngredientsActions |
    TCurrentIngredientActions |
    TOrderActions |
    TUserActions | 
    TWSActions


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
export type AppDispatch = <TReturnType>(action: TApplicationActions | AppThunk) => TReturnType
