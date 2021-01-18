import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, makeStyles, 
    OutlinedInput, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSignupModal, openLoginModal, signupAttempt } from '../../redux'
import { CLEAR_SIGNUP, RESET_SIGNUP_TEXT, SIGNUP_INVALID_EMAIL, SIGNUP_INVALID_PHONE, SIGNUP_INVALID_PW, SIGNUP_INVALID_PW2 } from '../../redux/User/types'
import {ValidateEmail, ValidatePhone, ValidatePW } from '../../formValidators' 
import {Link} from 'react-router-dom'
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
    const [pw2, setPw2] = useState("")
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
        if(pass !== pw2){
            dispatch({type: SIGNUP_INVALID_PW2})
        }
        if(ValidateEmail(email) && ValidatePW(pass) && ValidatePhone(mobile)){
            dispatch(signupAttempt({email: email, password:pass, mobile_no: mobile})) 
            setMobile("")
            setEmail("")
            setPass("")
            setPw2("")
        }
    }
    const errPW = useSelector(state=>state.user.error_pw)
    const errMob = useSelector(state=>state.user.error_mob)
    const errEmail = useSelector(state=>state.user.error_email)
    const errPW2 = useSelector(state=>state.user.error_pw2)
    const display = useSelector(state=>state.user.display_signup_text)
    return (
        <Dialog fullScreen={fullScreen} open = {open} onClose = {handleClose}>
            <DialogTitle>Signup</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <TextField variant="outlined" margin="dense"
                        error={errEmail} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        color="primary" 
                        type="email" placeholder="Email" fullWidth 
                        helperText={errEmail?"Invalid email. Please enter a valid email address": ""}
                        label="Email"
                    />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <TextField variant="outlined" margin="dense"
                        error={errMob} 
                        onChange={(e)=>setMobile(e.target.value)} 
                        value={mobile} 
                        type="text" color="primary" placeholder="Mobile Number" fullWidth
                        label="Mobile Number"
                        helperText={errMob?"Invalid mobile number": ""} 
                    />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <TextField variant="outlined" margin="dense" 
                        error={errPW} 
                        onChange={(e)=>setPass(e.target.value)} 
                        value={pass} 
                        type="password" color="primary" placeholder="Password" fullWidth
                        label="Password"
                        helperText={errPW?"Password too short": ""} 
                    />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <TextField variant="outlined" margin="dense" 
                        error={errPW2} 
                        onChange={(e)=>setPw2(e.target.value)} 
                        value={pw2} 
                        type="password" color="primary" placeholder="Confirm Password" fullWidth
                        label="Confirm Password"
                        helperText={errPW2?"Passwords don't match": ""} 
                    />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <Typography variant="h6" align="center">
                        {display?"Signup successful! Please confirm your email and login":<Typography>By signing up you agree to our <Link to="/terms-of-service">terms of service</Link></Typography>}
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
