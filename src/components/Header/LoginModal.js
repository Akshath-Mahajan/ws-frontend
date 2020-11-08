import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, makeStyles, 
    OutlinedInput, useMediaQuery, useTheme } from '@material-ui/core'
import { loginAttempt } from '../../redux/'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme)=>({
    margin:{
        marginBottom: theme.spacing(2),
    }
})
)
function LoginModal() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const dispatch = useDispatch()
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>Login</Button>
            <Dialog
            fullScreen={fullScreen}
            open = {open}
            onClose = {handleClose}
            >
                <DialogTitle>
                    Login
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense" variant="outlined">
                        <OutlinedInput onChange={(e)=>setUser(e.target.value)} value={user} color="primary" type="text" placeholder="Username" fullWidth />
                    </FormControl>
                    <FormControl fullWidth margin="dense" variant="outlined">
                        <OutlinedInput onChange={(e)=>setPass(e.target.value)} value={pass} type="password" color="primary" placeholder="Password" fullWidth/>
                    </FormControl>
                <DialogActions>
                    <Button className={classes.margin} variant="contained" color="primary" 
                    autoFocus fullWidth 
                    onClick={()=>dispatch(loginAttempt({username:user, password:pass}))}>
                        Login
                    </Button>
                </DialogActions>
                <Button fullWidth variant="outlined">
                    Don't have an account? Signup
                </Button>  
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default LoginModal
