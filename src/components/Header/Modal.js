import React from 'react'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

function Modal({isSignup, open, handleClose}) {
    if(isSignup)
        return <SignupModal open = {open} handleClose = {handleClose} />
    return <LoginModal open={open} handleClose={handleClose} />
}

export default Modal
