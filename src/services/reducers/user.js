import { REGISTER_USER_FAILED, REGISTER_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS, GET_USER_REQUEST, REGISTER_USER_SUCCESS, AUTH_USER_FAILED, AUTH_USER_REQUEST, AUTH_USER_SUCCESS, UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "../actions/user"

const initialState = {
    user: null,

    userRequest: false,
    userFailed: false,

    registerRequest: false,
    registerFailed: false,

    authRequest: false,
    authFailed: false,

    updateRequest: false,
    updateFailed: false
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                user: null,
                registerRequest: false,
                registerFailed: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                user: {
                    email: action.email,
                    name: action.name
                },
                registerRequest: false
            }
        }

        case AUTH_USER_REQUEST: {
            return {
                ...state,
                authRequest: true
            }
        }
        case AUTH_USER_FAILED: {
            return {
                ...state,
                user: null,
                authRequest: false,
                authFailed: true
            }
        }
        case AUTH_USER_SUCCESS: {
            return {
                ...state,
                user: {
                    email: action.email,
                    name: action.name
                },
                authRequest: false
            }
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                user: null,
                userRequest: false,
                userFailed: true
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                user: {
                    email: action.email,
                    name: action.name
                },
                userRequest: false
            }
        }

        case UPDATE_USER_INFO_REQUEST: {
            return {
                ...state,
                updateRequest: true
            }
        }
        case UPDATE_USER_INFO_FAILED: {
            return {
                ...state,
                user: null,
                updateRequest: false,
                updateFailed: true
            }
        }
        case UPDATE_USER_INFO_SUCCESS: {
            return {
                ...state,
                user: {
                    email: action.email,
                    name: action.name
                },
                updateRequest: false
            }
        }

        default: {
            return state
        }
    }
}