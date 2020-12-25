import { Box, Button, Grid, TextField, Typography, IconButton, Icon } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DOMAIN } from '../../settings'
import axios from 'axios'
import { setDetials } from '../../redux/';
import { ValidateEmail, ValidatePhone } from '../../formValidators'
function ProfileInfo() {
    //Global state from DB:
    const full_name = useSelector(state=>state.user.name)
    const mail = useSelector(state=>state.user.email)
    const mob = useSelector(state=>state.user.mobile)
    const dispatch = useDispatch()
    //Local state that may be edited but not saved to DB:
    const [fname, setFName] = React.useState(full_name)
    const [email, setEmail] = React.useState(mail)
    const [mobile, setMobile] = React.useState(mob)
    const [editing, setEditing] = React.useState(false)

    const handleSubmitClick = () => {
        if(editing){
            setEditing(false)
            if(ValidateEmail(email) && ValidatePhone(mobile))
                
                axios.post(DOMAIN+"/api/edit-user/", 
                {full_name: fname, email:email, mobile:mobile},
                {headers: {Authorization: "Token "+localStorage.getItem('token')}}            
                ).then(res=>dispatch(setDetials(res.data)))
        }
        else
            setEditing(true)
    }
    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item container xs={12} spacing={1}>
                {/* Full Name */}
                <TextField disabled={!editing} variant="outlined" value={fname} onChange={(e)=>{setFName(e.target.value)}} label="Full Name" fullWidth margin="dense"/>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                {/* Email */}
                <TextField error={!ValidateEmail(email)} disabled={!editing} onChange={(e)=>{setEmail(e.target.value)}} variant="outlined" value={email} label="Email" fullWidth margin="dense"/>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                {/* Mobile */}
                <TextField error={!ValidatePhone(mobile)} disabled={!editing} variant="outlined" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} label="Mobile Number" fullWidth margin="dense"/>
            </Grid>
            <Grid item container xs={12} spacing={1} justify="center">
                <Grid item xs={4}>
                    <Button fullWidth disabled={!ValidateEmail(email) || !ValidatePhone(mobile)} color={editing?"primary":"secondary"} variant="contained" onClick={handleSubmitClick}>
                        {editing?"Save":"Edit"}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProfileInfo
