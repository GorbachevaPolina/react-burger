import { userReducer, initialState } from "./user";
import * as types from '../action-types/user-actions'
import { email, name } from "../../utils/auth-test-data";

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REGISTER_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.REGISTER_USER_REQUEST
        })).toEqual({
            ...initialState,
            registerRequest: true
        })
    })

    it('should handle REGISTER_USER_FAILED', () => {
        expect(userReducer({
            ...initialState,
            registerRequest: true
        }, {
            type: types.REGISTER_USER_FAILED
        })).toEqual({
            ...initialState,
            registerFailed: true
        })
    })

    it('should handle REGISTER_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            registerRequest: true
        }, {
            type: types.REGISTER_USER_SUCCESS,
            email,
            name
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            }
        })
    })

    it('should handle AUTH_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.AUTH_USER_REQUEST
        })).toEqual({
            ...initialState,
            authRequest: true
        })
    })

    it('should handle AUTH_USER_FAILED', () => {
        expect(userReducer({
            ...initialState,
            authRequest: true
        }, {
            type: types.AUTH_USER_FAILED
        })).toEqual({
            ...initialState,
            authFailed: true
        })
    })

    it('should handle AUTH_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            authRequest: true
        }, {
            type: types.AUTH_USER_SUCCESS,
            email,
            name
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            }
        })
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.GET_USER_REQUEST
        })).toEqual({
            ...initialState,
            userRequest: true
        })
    })

    it('should handle GET_USER_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userRequest: true
        }, {
            type: types.GET_USER_FAILED
        })).toEqual({
            ...initialState,
            userFailed: true
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userRequest: true
        }, {
            type: types.GET_USER_SUCCESS,
            email,
            name
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            }
        })
    })

    it('should handle UPDATE_USER_INFO_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.UPDATE_USER_INFO_REQUEST
        })).toEqual({
            ...initialState,
            updateRequest: true
        })
    })

    it('should handle UPDATE_USER_INFO_FAILED', () => {
        expect(userReducer({
            ...initialState,
            updateRequest: true
        }, {
            type: types.UPDATE_USER_INFO_FAILED
        })).toEqual({
            ...initialState,
            updateFailed: true
        })
    })

    it('should handle UPDATE_USER_INFO_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            updateRequest: true
        }, {
            type: types.UPDATE_USER_INFO_SUCCESS,
            email,
            name
        })).toEqual({
            ...initialState,
            user: {
                email,
                name
            }
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.FORGOT_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: true
        })
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(userReducer({
            ...initialState,
            forgotPasswordRequest: true
        }, {
            type: types.FORGOT_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            forgotPasswordFailed: true
        })
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            forgotPasswordRequest: true
        }, {
            type: types.FORGOT_PASSWORD_SUCCESS
        })).toEqual({
            ...initialState,
            forgotPasswordSuccess: true
        })
    })

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.RESET_PASSWORD_REQUEST
        })).toEqual({
            ...initialState,
            resetPasswordRequest: true
        })
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(userReducer({
            ...initialState,
            resetPasswordRequest: true
        }, {
            type: types.RESET_PASSWORD_FAILED
        })).toEqual({
            ...initialState,
            resetPasswordFailed: true
        })
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            resetPasswordRequest: true
        }, {
            type: types.RESET_PASSWORD_SUCCESS
        })).toEqual({
            ...initialState,
            resetPasswordSuccess: true
        })
    })

    it('should handle LOGOUT', () => {
        expect(userReducer(initialState, {
            type: types.LOGOUT
        })).toEqual(initialState)
    })
})