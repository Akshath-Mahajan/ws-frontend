import { LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types'

const initialState = {
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    login_status: 0,
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
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                email:action.payload.email,
                login_status: 1
            }
        }
        case LOGOUT: {
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            return {
                ...state,
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token'),
                login_status: 0
            }
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                login_status: -1
            }
        }
        default: return state
    }
}

export default userReducer;