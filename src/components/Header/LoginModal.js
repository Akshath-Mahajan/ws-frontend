import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, makeStyles, 
    OutlinedInput, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { loginAttempt, closeLoginModal, openSignupModal } from '../../redux/'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme)=>({
    margin:{
        marginBottom: theme.spacing(2),
    }
})
)
function LoginModal() {
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    
    const dispatch = useDispatch()
    const login_status = useSelector(state => state.user.login_status)
    const open = useSelector(state=>state.user.login_modal)
    const handleClose = () => { dispatch(closeLoginModal()) }
    const switchModals = ()=> { dispatch(openSignupModal()) }
    const attemptLogin = () => { dispatch(loginAttempt({ email: email, password:pass })) }
    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
            <DialogTitle> Login </DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={login_status===-1} onChange={(e)=>setEmail(e.target.value)} value={email} color="primary" type="email" placeholder="Email" fullWidth />
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <OutlinedInput error={login_status===-1} onChange={(e)=>setPass(e.target.value)} value={pass} type="password" color="primary" placeholder="Password" fullWidth/>
                </FormControl>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <Typography variant="subtitle2" align="center">
                        {login_status===-1?"INVALID USERNAME AND PASSWORD":""}
                    </Typography>
                </FormControl>
            <DialogActions>
                <Button className={classes.margin} variant="contained" 
                color="primary" autoFocus fullWidth onClick={attemptLogin}>
                    Login
                </Button>
            </DialogActions>
            <Button fullWidth variant="outlined" onClick={switchModals}>
                Don't have an account? Signup
            </Button>  
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal
