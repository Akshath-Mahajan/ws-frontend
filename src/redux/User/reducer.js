import { LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types'

const initialState = {
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
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                login_status: 1
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            return {
                ...state,
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