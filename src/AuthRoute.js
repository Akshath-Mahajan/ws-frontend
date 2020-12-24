import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { openLoginModal } from './redux'
function T(){
    const dispatch = useDispatch()
    dispatch(openLoginModal())
    return <></>
}
function AuthRoute(props) {
    const user = useSelector(state=>state.user.token)
    const loginModal = useSelector(state=>state.user.login_modal)
    return (
        <div>
            <Route exact path = {props.path} 
            render={
                () => user? props.children:
                    <T />
			}/>
        </div>
    )
}

export default AuthRoute