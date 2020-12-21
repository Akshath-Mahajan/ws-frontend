import { LOGIN_ATTEMPT, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types'

const initialState = {
    token: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
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
            localStorage.setItem('name', action.payload.full_name)
            return {
                ...state,
                token: action.payload.token,
                name: action.payload.full_name,
                login_status: 1
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
        default: return state
    }
}

export default userReducer;