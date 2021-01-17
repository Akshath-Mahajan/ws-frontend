import axios from 'axios'
import { LOGOUT, LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_ATTEMPT, 
    OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, OPEN_SIGNUP_MODAL, 
    CLOSE_SIGNUP_MODAL, SIGNUP_SUCCESS, SIGNUP_FAIL,
    SET_DETAILS
} from './types'
import { DOMAIN } from '../../settings'
const logout = () => {
    return {
        type: LOGOUT
    }
}
export { logout }
const loginSuccess = (data) => {
    if(data.full_name===null){data.full_name = ""}
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
    axios.post(DOMAIN+"/api/signup/", data)
    .then(res=> {
        dispatch({type: SIGNUP_SUCCESS})
    })
    .catch(err=> dispatch({type: SIGNUP_FAIL}))
}

export { loginAttempt }
export { loginFail }
export { loginSuccess }
export {signupAttempt}

const openLoginModal = () => {
    return {
        type: OPEN_LOGIN_MODAL
    }
}
const closeLoginModal = () => {
    return {
        type: CLOSE_LOGIN_MODAL
    }
}
const openSignupModal = () => {
    return {
        type: OPEN_SIGNUP_MODAL
    }
}
const closeSignupModal = ()=>{
    return {
        type: CLOSE_SIGNUP_MODAL
    }
}
export {openLoginModal, openSignupModal, closeLoginModal, closeSignupModal}

const setDetials = (data) => ({
    type: SET_DETAILS,
    payload: data
}
)

export {setDetials}