import axios from 'axios'
import { LOGOUT, LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_ATTEMPT } from './types'
import { DOMAIN } from '../../settings'
const logout = () => {
    return {
        type: LOGOUT
    }
}
export { logout }
const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS, 
        payload: data
    }
}
const loginFail = () => {
    return {
        type: LOGIN_FAIL
    }
}
const loginAttempt = (data) => (dispatch) => {
    dispatch({type: LOGIN_ATTEMPT})
    axios.post(`${DOMAIN}/api/login/`, data)
    .then(res => {
            if(res.data.token){
                dispatch(loginSuccess(res.data))
            } else {
                dispatch(loginFail())   
            }
        }
    )
    .catch(err=>console.log(err))
}

const signupAttempt = (data) => (dispatch) => {
    console.log('attempted signup')
}

export { loginAttempt }
export { loginFail }
export { loginSuccess }
export {signupAttempt}