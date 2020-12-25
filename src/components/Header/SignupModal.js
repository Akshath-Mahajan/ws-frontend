import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, makeStyles, 
    OutlinedInput, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSignupModal, openLoginModal, signupAttempt } from '../../redux'
import { CLEAR_SIGNUP, RESET_SIGNUP_TEXT, SIGNUP_INVALID_EMAIL, SIGNUP_INVALID_PHONE, SIGNUP_INVALID_PW } from '../../redux/User/types'
import {ValidateEmail, ValidatePhone, ValidatePW } from '../../formValidators' 
const useStyles = makeStyles((theme)=>({
    margin:{
        marginBottom: theme.spacing(2),
    }
})
)

function SignupModal() {
    const classes = useStyles()
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const dispatch = useDispatch()
    const open = useSelector(state=>state.user.signup_modal)
    const handleClose = () => { dispatch(closeSignupModal()) }
    const switchModals = ()=> { dispatch(openLoginModal()) }
    
    const attemptSignup = ()=> {
        dispatch({type: CLEAR_SIGNUP})
        if(!ValidateEmail(email)){
            dispatch({type: SIGNUP_INVALID_EMAIL})
        }
        if(!ValidatePhone(mobile)){
            dispatch({type: SIGNUP_INVALID_PHONE})
        }
        if(!ValidatePW(pass)){
            dispatch({type: SIGNUP_INVALID_PW})
        }
        if(ValidateEmail(email) && ValidatePW(pass) && ValidatePhone(mobile)){
            dispatch(signupAttempt({email: email, password:pass, mobile_no: mobile})) 
            setMobile("")
            setEmail("")
            setPass("")
        }
    }
    const errPW = useSelector(state=>state.user.error_pw)
    const errMob = useSelector(state=>state.user.error_mob)
    const errEmail = useSelector(state=>state.user.error_email)

    const display = useSelector(state=>state.user.display_signup_text)
    return (
        <Dialog fullScreen={fullScreen} open = {open} onClose = {handleClose}>
            <DialogTitle>Signup</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={errEmail} onChange={(e)=>setEmail(e.target.value)} value={email} color="primary" type="email" placeholder="Email" fullWidth />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={errPW} onChange={(e)=>setPass(e.target.value)} value={pass} type="password" color="primary" placeholder="Password" fullWidth/>
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={errMob} onChange={(e)=>setMobile(e.target.value)} value={mobile} type="text" color="primary" placeholder="Mobile Number" fullWidth/>
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <Typography variant="subtitle2" align="center">
                        {display?"Signup successful! Please confirm your email and login":""}
                    </Typography>
                </FormControl>
            <DialogActions>
                <Button className={classes.margin} variant="contained" color="primary" 
                autoFocus fullWidth 
                onClick={attemptSignup}>
                    Signup
                </Button>
            </DialogActions>
            <Button fullWidth variant="outlined" onClick={switchModals}>
                Already have an account? Login
            </Button>  
            </DialogContent>
        </Dialog>
    )
}

export default SignupModal
