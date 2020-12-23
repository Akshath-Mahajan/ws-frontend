import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'

function PasswordReset() {
    return (
        <Grid item container xs={12} spacing={2}>
            <TextField variant="outlined" margin="dense" fullWidth label="Current Password" />
            <TextField variant="outlined" margin="dense" fullWidth label="New Password" />
            <TextField variant="outlined" margin="dense" fullWidth label="Confirm New Password" style={{marginBottom: 24}}/>
            <Button variant="contained" color="primary" fullWidth>
                Reset Password!
            </Button>
        </Grid>
    )
}

export default PasswordReset
