import { deleteCookie, getCookie, setCookie } from "../../utils/auth";
import { URL } from '../../utils/url'

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";

export const AUTH_USER_REQUEST = "AUTH_USER_REQUEST";
export const AUTH_USER_FAILED = "AUTH_USER_FAILED";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO"
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO"
export const UPDATE_USER_INFO_FAILED = "UPDATE_USER_INFO"

export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";

export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"

export const LOGOUT = "LOGOUT"

export function register(user) {
    return function(dispatch) {
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
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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

export function login(user) {
    return function(dispatch) {
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
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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

export function updateToken(refreshToken) {
    return function(dispatch) {
        return fetch(`${URL}auth/token`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: refreshToken})
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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
}

export function getUserInfo(token) {
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        })

        fetch(`${URL}auth/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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

export function getUser() {
    return function(dispatch) {
        const token = getCookie('token')
        const refreshToken = getCookie('refreshToken')
        if(!refreshToken) {
            dispatch({
                type: GET_USER_FAILED
            })
            return;
        }
        if (!token) {
            dispatch(updateToken(refreshToken)).then((result) => dispatch(getUserInfo(result.accessToken.split('Bearer ')[1])))
        } else {
            dispatch(getUserInfo(token))
        }
    }
}

export function updateUserInfo(token, newUserInfo) {
    return function(dispatch) {
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
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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

export function updateUser(newUserInfo) {
    return function(dispatch) {
        const token = getCookie('token')
        const refreshToken = getCookie('refreshToken')
        if (!token) {
            dispatch(updateToken(refreshToken)).then((result) => dispatch(updateUserInfo(result.accessToken.split('Bearer ')[1], newUserInfo)))
        } else {
            dispatch(updateUserInfo(token, newUserInfo))
        }
    }
}

export function logout() {
    return function(dispatch) {
        const refreshToken = getCookie('refreshToken')
        fetch(`${URL}auth/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: refreshToken})
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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

export function forgotPassword(email) {
    return function(dispatch) {
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
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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

export function resetPassword(password, code) {
    return function(dispatch) {
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
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
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