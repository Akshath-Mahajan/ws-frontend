import { Grid, Typography, Icon, ThemeProvider } from '@material-ui/core'
import React from 'react'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { headingFont } from '../../baseTheme';
function Success() {
    return (
        <Grid container justify="center" alignItems="center" style={{height: '90vh', width: '100vw'}}>
            <Grid item>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <Icon style={{ color:'green' }}>
                        <CheckCircleOutlineIcon style={{fontSize: '5vw'}} />
                    </Icon>
                </div>
                <ThemeProvider theme={headingFont}>
                <Typography variant="h4" align="center">Your order has successfully been placed.</Typography>
                </ThemeProvider>
            </Grid>   
        </Grid>
    )
}

export default Success
