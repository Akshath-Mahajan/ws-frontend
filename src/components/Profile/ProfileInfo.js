import { Box, Button, Grid, TextField, Typography, IconButton } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
function ProfileInfo() {
    const {fname, lname, mobile, email, editing} = useSelector(state=>state.profile.profileInfo)
    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item container xs={12} spacing={1}>
                <Grid container item xs={12} sm={6}>
                    <TextField  variant="outlined" defaultValue={fname} label="First Name" fullWidth margin="dense"/>
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <TextField  variant="outlined" defaultValue={lname} label="Last Name" fullWidth margin="dense"/>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid container item xs={11}>
                    <TextField disabled={!editing.email} variant="outlined" defaultValue={email} label="Email" fullWidth margin="dense"/>
                </Grid>
                <Grid container item xs={1} alignItems="flex-end">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid container item xs={11}>
                    <TextField disabled={!editing.mobile} variant="outlined" defaultValue={mobile} label="Mobile Number" fullWidth margin="dense"/>
                </Grid>
                <Grid container item xs={1} alignItems="flex-end">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Button fullWidth color="primary" variant="contained">Save</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProfileInfo
