import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, makeStyles, 
    OutlinedInput, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signupAttempt } from '../../redux'

const useStyles = makeStyles((theme)=>({
    margin:{
        marginBottom: theme.spacing(2),
    }
})
)

function SignupModal({open, handleClose}) {
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const dispatch = useDispatch()
    return (
        <Dialog
        fullScreen={fullScreen}
        open = {open}
        onClose = {handleClose}
        >
            <DialogTitle>
                Signup
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={false} onChange={(e)=>setEmail(e.target.value)} value={email} color="primary" type="email" placeholder="Email" fullWidth />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={false} onChange={(e)=>setPass(e.target.value)} value={pass} type="password" color="primary" placeholder="Password" fullWidth/>
                </FormControl>
            <DialogActions>
                <Button className={classes.margin} variant="contained" color="primary" 
                autoFocus fullWidth 
                onClick={()=>dispatch(signupAttempt({email: email, password:pass}))}>
                    Signup
                </Button>
            </DialogActions>
            <Button fullWidth variant="outlined">
                Already have an account? Login
            </Button>  
            </DialogContent>
        </Dialog>
    )
}

export default SignupModal
