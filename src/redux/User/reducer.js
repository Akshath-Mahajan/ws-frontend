import { CLOSE_LOGIN_MODAL, CLOSE_SIGNUP_MODAL, LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, OPEN_LOGIN_MODAL, OPEN_SIGNUP_MODAL, CLEAR_SIGNUP, SIGNUP_INVALID_EMAIL, SIGNUP_INVALID_PHONE, SIGNUP_INVALID_PW, RESET_SIGNUP_TEXT, SIGNUP_SUCCESS } from './types'

const initialState = {
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
    login_status: 0,
    login_modal: false,
    signup_modal: false,
    error_pw: false,
    error_mob: false,
    error_email: false,
    display_signup_text: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_ATTEMPT: {
            return {
                ...state,
                login_status: 0
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('name', action.payload.full_name)
            return {
                ...state,
                token: action.payload.token,
                name: action.payload.full_name,
                login_status: 1,
                login_modal: false,
                signup_modal: false,
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            return {
                ...state,
                token: localStorage.getItem('token'),
                name: localStorage.getItem('name'),
                login_status: 0
            }
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                login_status: -1
            }
        }
        case OPEN_LOGIN_MODAL: {
            return {
                ...state,
                signup_modal: false,
                login_modal: true
            }
        }
        case OPEN_SIGNUP_MODAL: {
            return {
                ...state,
                signup_modal: true,
                login_modal: false,
                error_mob: false, error_email: false, error_pw: false,
                display_signup_text: false,
            }
        }
        case CLOSE_LOGIN_MODAL: {
            return {
                ...state,
                login_modal: false
            }
        }
        case CLOSE_SIGNUP_MODAL: {
            return {
                ...state,
                signup_modal: false,
                error_mob: false, error_email: false, error_pw: false
            }
        }
        case CLEAR_SIGNUP: return {
            ...state,
            error_mob: false, error_email: false, error_pw: false
        }
        case SIGNUP_INVALID_EMAIL: return {
            ...state,
            error_email: true
        }
        case SIGNUP_INVALID_PHONE: return {
            ...state,
            error_mob: true
        }
        case SIGNUP_INVALID_PW: return {
            ...state,
            error_pw: true
        }
        case RESET_SIGNUP_TEXT: return {
            ...state, display_signup_text: false
        }
        case SIGNUP_SUCCESS: return {
            ...state, display_signup_text: true
        }
        default: return state
    }
}

export default userReducer;