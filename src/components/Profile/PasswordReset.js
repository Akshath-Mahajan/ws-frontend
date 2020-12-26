import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import {DOMAIN} from '../../settings'
import { ValidatePW } from '../../formValidators'
function PasswordReset() {
    const [oldPW, setOldPW] = useState("")
    const [newPW1, setNewPW1] = useState("")
    const [newPW2, setNewPW2] = useState("")
    const [err, setErr] = useState(false)
    const [oldErr, setOldErr] = useState(false)
    const handleChange = (e, pw_num) => {
        setErr(false)
        switch(pw_num){
            case 0: { 
                setOldErr(false) 
                setOldPW(e.target.value) 
                break
            }
            case 1: setNewPW1(e.target.value)
                break
            case 2: setNewPW2(e.target.value)
                break
        }
    }
    const submitClick = () => {
        if(oldPW === "") { setOldErr(true) }
        if(ValidatePW(newPW1) && (newPW1===newPW2) && (oldPW !== ""))
            axios.post(DOMAIN+'/api/password/', 
            {old_pw: oldPW, new_pw1: newPW1, new_pw2: newPW2}, 
            {headers: {Authorization: "Token "+localStorage.getItem('token')}}
            )
            .err(setOldErr(true))
        else
            setErr(true)
        
    }
    return (
        <Grid item container xs={12} spacing={2}>
            <TextField value={oldPW} type="password" variant="outlined" error={oldErr} margin="dense" fullWidth label="Current Password" onChange={e=>handleChange(e, 0)} />
            <TextField value={newPW1} type="password" variant="outlined" error={err} margin="dense" fullWidth label="New Password" onChange={e=>handleChange(e, 1)} />
            <TextField value={newPW2} type="password" variant="outlined" error={err} margin="dense" fullWidth label="Confirm New Password" style={{marginBottom: 24}} onChange={e=>handleChange(e, 2)} />
            <Button variant="contained" color="primary" fullWidth onClick={submitClick}>
                Reset Password!
            </Button>
        </Grid>
    )
}

export default PasswordReset
