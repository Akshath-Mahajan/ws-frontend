import axios from 'axios'
import { LOGOUT, LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_ATTEMPT } from './types'

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
    axios.post("http://127.0.0.1:8000/api/login/", data)
    .then(res => {
            if(res.data.token){
                dispatch(loginSuccess({...res.data, email:data.email}))
            } else {
                dispatch(loginFail())   
            }
        }
    )
    .catch(err=>console.log(err))
}



export { loginAttempt }
export { loginFail }
export { loginSuccess }