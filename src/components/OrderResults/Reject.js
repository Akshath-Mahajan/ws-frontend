import { Grid, Typography, Icon, ThemeProvider } from '@material-ui/core'
import React from 'react'

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { headingFont } from '../../baseTheme'
function Success() {
    return (
        <Grid container justify="center" alignItems="center" style={{height: '90vh', width: '100vw'}}>
            <Grid item>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <Icon style={{ color:'red' }}>
                        <ErrorOutlineIcon style={{fontSize: '5vw'}} />
                    </Icon>
                </div>
                <ThemeProvider theme={headingFont}> 
                <Typography variant="h4" align="center">Looks like there was an error in placing your order. Please try again later</Typography>
                </ThemeProvider>
            </Grid>   
        </Grid>
    )
}

export default Success
