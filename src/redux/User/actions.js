import axios from 'axios'
import { LOGOUT, LOGIN_FAIL, LOGIN_SUCCESS } from './types'

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
const loginFail = (data) => {
    return {
        type: LOGIN_FAIL,
        payload: data
    }
}
const loginAttempt = (data) => (dispatch) => {
    axios.post("http://127.0.0.1:8000/api/login/", data)
    .then(res => 
        dispatch(loginSuccess({...res.data, username:data.username}))
    )
    .catch(err=>console.log(err))
}



export { loginAttempt }
export { loginFail }
export { loginSuccess }