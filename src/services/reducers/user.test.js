import { userReducer } from "./user";
import * as types from '../action-types/user-actions'

const init = {
    user: null,

    userRequest: false,
    userFailed: false,

    registerRequest: false,
    registerFailed: false,

    authRequest: false,
    authFailed: false,

    updateRequest: false,
    updateFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordSuccess: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false
}

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(init)
    })

    it('should handle REGISTER_USER_REQUEST', () => {
        expect(userReducer(init, {
            type: types.REGISTER_USER_REQUEST
        })).toEqual({
            ...init,
            registerRequest: true
        })
    })

    it('should handle REGISTER_USER_FAILED', () => {
        expect(userReducer({
            ...init,
            registerRequest: true
        }, {
            type: types.REGISTER_USER_FAILED
        })).toEqual({
            ...init,
            registerFailed: true
        })
    })

    it('should handle REGISTER_USER_SUCCESS', () => {
        expect(userReducer({
            ...init,
            registerRequest: true
        }, {
            type: types.REGISTER_USER_SUCCESS,
            email: 'test@gmail.com',
            name: 'test'
        })).toEqual({
            ...init,
            user: {
                email: 'test@gmail.com',
                name: 'test'
            }
        })
    })

    it('should handle AUTH_USER_REQUEST', () => {
        expect(userReducer(init, {
            type: types.AUTH_USER_REQUEST
        })).toEqual({
            ...init,
            authRequest: true
        })
    })

    it('should handle AUTH_USER_FAILED', () => {
        expect(userReducer({
            ...init,
            authRequest: true
        }, {
            type: types.AUTH_USER_FAILED
        })).toEqual({
            ...init,
            authFailed: true
        })
    })

    it('should handle AUTH_USER_SUCCESS', () => {
        expect(userReducer({
            ...init,
            authRequest: true
        }, {
            type: types.AUTH_USER_SUCCESS,
            email: 'test@gmail.com',
            name: 'test'
        })).toEqual({
            ...init,
            user: {
                email: 'test@gmail.com',
                name: 'test'
            }
        })
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(init, {
            type: types.GET_USER_REQUEST
        })).toEqual({
            ...init,
            userRequest: true
        })
    })

    it('should handle GET_USER_FAILED', () => {
        expect(userReducer({
            ...init,
            userRequest: true
        }, {
            type: types.GET_USER_FAILED
        })).toEqual({
            ...init,
            userFailed: true
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer({
            ...init,
            userRequest: true
        }, {
            type: types.GET_USER_SUCCESS,
            email: 'test@gmail.com',
            name: 'test'
        })).toEqual({
            ...init,
            user: {
                email: 'test@gmail.com',
                name: 'test'
            }
        })
    })

    it('should handle UPDATE_USER_INFO_REQUEST', () => {
        expect(userReducer(init, {
            type: types.UPDATE_USER_INFO_REQUEST
        })).toEqual({
            ...init,
            updateRequest: true
        })
    })

    it('should handle UPDATE_USER_INFO_FAILED', () => {
        expect(userReducer({
            ...init,
            updateRequest: true
        }, {
            type: types.UPDATE_USER_INFO_FAILED
        })).toEqual({
            ...init,
            updateFailed: true
        })
    })

    it('should handle UPDATE_USER_INFO_SUCCESS', () => {
        expect(userReducer({
            ...init,
            updateRequest: true
        }, {
            type: types.UPDATE_USER_INFO_SUCCESS,
            email: 'test@gmail.com',
            name: 'test'
        })).toEqual({
            ...init,
            user: {
                email: 'test@gmail.com',
                name: 'test'
            }
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(userReducer(init, {
            type: types.FORGOT_PASSWORD_REQUEST
        })).toEqual({
            ...init,
            forgotPasswordRequest: true
        })
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(userReducer({
            ...init,
            forgotPasswordRequest: true
        }, {
            type: types.FORGOT_PASSWORD_FAILED
        })).toEqual({
            ...init,
            forgotPasswordFailed: true
        })
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(userReducer({
            ...init,
            forgotPasswordRequest: true
        }, {
            type: types.FORGOT_PASSWORD_SUCCESS
        })).toEqual({
            ...init,
            forgotPasswordSuccess: true
        })
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(userReducer(init, {
            type: types.RESET_PASSWORD_REQUEST
        })).toEqual({
            ...init,
            resetPasswordRequest: true
        })
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(userReducer({
            ...init,
            resetPasswordRequest: true
        }, {
            type: types.RESET_PASSWORD_FAILED
        })).toEqual({
            ...init,
            resetPasswordFailed: true
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(userReducer({
            ...init,
            resetPasswordRequest: true
        }, {
            type: types.RESET_PASSWORD_SUCCESS
        })).toEqual({
            ...init,
            resetPasswordSuccess: true
        })
    })

    it('should handle LOGOUT', () => {
        expect(userReducer(init, {
            type: types.LOGOUT
        })).toEqual(init)
    })
})