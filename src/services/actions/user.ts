import { deleteCookie, getCookie, setCookie } from "../../utils/auth";
import { URL } from '../../utils/url'
import { checkResponse } from "../../utils/check-response";
import { AppDispatch, AppThunk } from "../types/store";
import { TFull, TLogin } from "../types/inputs";
import { TRefreshTokenResult } from "../types/response";
import { 
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_USER_REQUEST,
    AUTH_USER_FAILED,
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    LOGOUT
} from "../action-types/user-actions";

export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly name: string;
    readonly email: string;
}

export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IAuthUserRequestAction {
    readonly type: typeof AUTH_USER_REQUEST;
}

export interface IAuthUserFailedAction {
    readonly type: typeof AUTH_USER_FAILED;
}

export interface IAuthUserSuccessAction {
    readonly type: typeof AUTH_USER_SUCCESS;
    readonly name: string;
    readonly email: string;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly name: string;
    readonly email: string;
}

export interface IUpdateUserInfoRequestAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}

export interface IUpdateUserInfoFailedAction {
    readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export interface IUpdateUserInfoSuccessAction {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    readonly name: string;
    readonly email: string;
}

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface ILogoutAction {
    readonly type: typeof LOGOUT;
}

export type TUserActions = 
    IRegisterUserFailedAction |
    IRegisterUserRequestAction |
    IRegisterUserSuccessAction |
    IAuthUserFailedAction |
    IAuthUserRequestAction |
    IAuthUserSuccessAction |
    IGetUserFailedAction |
    IGetUserRequestAction |
    IGetUserSuccessAction |
    IUpdateUserInfoFailedAction |
    IUpdateUserInfoRequestAction |
    IUpdateUserInfoSuccessAction | 
    IForgotPasswordFailedAction |
    IForgotPasswordRequestAction |
    IForgotPasswordSuccessAction |
    IResetPasswordFailedAction |
    IResetPasswordRequestAction |
    IResetPasswordSuccessAction | 
    ILogoutAction;

export function register(user: TFull): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        fetch(`${URL}auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(checkResponse)
        .then((result) => {
            if(result.success) {
                const token = result.accessToken.split('Bearer ')[1];
                const refreshToken = result.refreshToken;

                setCookie('token', token, {expires: 1200});
                setCookie('refreshToken', refreshToken)
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    email: result.user.email,
                    name: result.user.name
                })
            }
        })
        .catch((error) => dispatch({
            type: REGISTER_USER_FAILED
        }))
    }
}

export function login(user: TLogin): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: AUTH_USER_REQUEST
        })
        fetch(`${URL}auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(checkResponse)
        .then((result) => {
            if(result.success) {
                const token = result.accessToken.split('Bearer ')[1];
                const refreshToken = result.refreshToken;

                setCookie('token', token, {expires: 1200});
                setCookie('refreshToken', refreshToken)
                dispatch({
                    type: AUTH_USER_SUCCESS,
                    email: result.user.email,
                    name: result.user.name
                })
            }
        })
        .catch((error) => dispatch({
            type: AUTH_USER_FAILED
        }))
    }
}

// export function updateToken(refreshToken: string): AppThunk<Promise<any>> {
//     return function(dispatch: AppDispatch) {
//         return fetch(`${URL}auth/token`, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({token: refreshToken})
//         })
//         .then(checkResponse)
//         .then((result) => {
//             if(result.success) {
//                 const token = result.accessToken.split('Bearer ')[1];
//                 const refreshToken = result.refreshToken;

//                 setCookie('token', token, {expires: 1200});
//                 setCookie('refreshToken', refreshToken)
//                 return result
//             }
//         })
//         .catch((error) => {
//             console.error(error)
//         })
//     }
// }
const updateToken = async (refreshToken: string) => {
    return fetch(`${URL}auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({token: refreshToken})
    })
    .then(checkResponse)
    .then((result) => {
        if(result.success) {
            const token = result.accessToken.split('Bearer ')[1];
            const refreshToken = result.refreshToken;

            setCookie('token', token, {expires: 1200});
            setCookie('refreshToken', refreshToken)
            return result
        }
    })
    .catch((error) => {
        console.error(error)
    })
}

export function getUserInfo(token: string): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })

        fetch(`${URL}auth/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(checkResponse)
        .then((result) => {
            if (result.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    email: result.user.email,
                    name: result.user.name
                })
            }
        })
        .catch((error) => dispatch({
            type: GET_USER_FAILED
        }))
    }
}

export function getUser(): AppThunk {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token')
        const refreshToken = getCookie('refreshToken')
        if(!refreshToken) {
            dispatch({
                type: GET_USER_FAILED
            })
            return;
        }
        if (!token) {
            // dispatch(updateToken(refreshToken)).then((result: any) => dispatch(getUserInfo(result.accessToken.split('Bearer ')[1])))
            updateToken(refreshToken).then((result: TRefreshTokenResult) => dispatch(getUserInfo(result.accessToken.split('Bearer ')[1])))
        } else {
            dispatch(getUserInfo(token))
        }
    }
}

export function updateUserInfo(token: string, newUserInfo: TFull) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST
        })
        fetch(`${URL}auth/user`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newUserInfo)
        })
        .then(checkResponse)
        .then((result) => {
            if(result.success) {
                dispatch({
                    type: UPDATE_USER_INFO_SUCCESS,
                    email: result.user.email,
                    name: result.user.name
                })
            }
        })
        .catch((error) => dispatch({
            type: UPDATE_USER_INFO_FAILED
        }))
    }
}

export function updateUser(newUserInfo: TFull) {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token')
        const refreshToken = getCookie('refreshToken')
        if (!token) {
            // dispatch(updateToken(refreshToken)).then((result: any) => dispatch(updateUserInfo(result.accessToken.split('Bearer ')[1], newUserInfo)))
            if(refreshToken)
                updateToken(refreshToken).then((result: TRefreshTokenResult) => dispatch(updateUserInfo(result.accessToken.split('Bearer ')[1], newUserInfo)))
        } else {
            dispatch(updateUserInfo(token, newUserInfo))
        }
    }
}

export function logout(): AppThunk {
    return function(dispatch: AppDispatch) {
        const refreshToken = getCookie('refreshToken')
        fetch(`${URL}auth/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: refreshToken})
        })
        .then(checkResponse)
        .then((result) => {
            if(result.success) {
                deleteCookie('token')
                deleteCookie('refreshToken')
                dispatch({
                    type: LOGOUT
                })
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export function forgotPassword(email: string): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        fetch(`${URL}password-reset`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email})
        })
        .then(checkResponse)
        .then((result) => {
            if(result.success) {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            })
        })
    }
}

export function resetPassword(password: string, code: string): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        fetch(`${URL}password-reset/reset`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password: password, token: code})
        })
        .then(checkResponse)
        .then((result) => {
            if(result.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: RESET_PASSWORD_FAILED
            })
        })
    }
}