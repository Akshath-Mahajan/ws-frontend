import { Box, Button, Grid, TextField, Typography, IconButton, Icon } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
function ProfileInfo() {
    const [fname, setFName] = React.useState("")
    const [lname, setLName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [mobile, setMobile] = React.useState("")
    const [editing, setEditing] = React.useState(false)
    const handleClick = () => {
        if(editing){
            setEditing(false)
            //save info here
        }
        else {
            setEditing(true)
        }
    }
    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item container xs={12} spacing={1}>
                <Grid container item xs={12} sm={6}>
                    <TextField disabled={!editing} variant="outlined" value={fname} onChange={(e)=>{setFName(e.target.value)}} label="First Name" fullWidth margin="dense"/>
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <TextField disabled={!editing} variant="outlined" value={lname} onChange={(e)=>{setLName(e.target.value)}} label="Last Name" fullWidth margin="dense"/>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <TextField disabled={!editing} onChange={(e)=>{setEmail(e.target.value)}} variant="outlined" value={email} label="Email" fullWidth margin="dense"/>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <TextField disabled={!editing} variant="outlined" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} label="Mobile Number" fullWidth margin="dense"/>
            </Grid>
            <Grid item container xs={12} spacing={1} justify="center">
                <Grid item xs={4}>
                    <Button fullWidth color={editing?"primary":"secondary"} variant="contained" onClick={handleClick}>
                        {editing?"Save":"Edit"}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProfileInfo
