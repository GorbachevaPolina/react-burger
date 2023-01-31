import { 
    REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
    GET_USER_FAILED, GET_USER_SUCCESS, GET_USER_REQUEST, 
    AUTH_USER_FAILED, AUTH_USER_REQUEST, AUTH_USER_SUCCESS, 
    UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS,
    FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
    LOGOUT,
    TUserActions
} from "../actions/user"

type TUserInfo = {
    name: string;
    email: string;
}

type TUserState = {
    user: TUserInfo | null;

    userRequest: boolean;
    userFailed: boolean;

    registerRequest: boolean;
    registerFailed: boolean;

    authRequest: boolean;
    authFailed: boolean;

    updateRequest: boolean;
    updateFailed: boolean;

    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;
    forgotPasswordSuccess: boolean;

    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
    resetPasswordSuccess: boolean;
}

const initialState: TUserState = {
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

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordFailed: false,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true
            }
        }

        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordRequest: false,
                resetPasswordSuccess: false
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordFailed: false,
                resetPasswordRequest: false,
                resetPasswordSuccess: true
            }
        }

        case LOGOUT: {
            return {
                ...state,
                user: null
            }
        }

        default: {
            return state
        }
    }
}