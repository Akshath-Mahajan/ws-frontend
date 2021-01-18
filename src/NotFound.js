import { Grid, Icon, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core'
import React from 'react'
import { headingFont } from './baseTheme'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const useStyles = makeStyles(theme=>({
    p: {padding: theme.spacing(4)}
}))
function NotFound() {
    const classes = useStyles()
    return (
        <Grid container justify="center" alignItems="center" style={{height: '90vh'}}>
            <Paper className={classes.p}>
                <ThemeProvider theme={headingFont}>
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <Icon style={{ color:'red' }}>
                            <ErrorOutlineIcon style={{fontSize: '5vw'}} />
                        </Icon>
                    </div>               
                    <Typography variant="h2" align="center">404 Error</Typography>
                    <Typography variant="h3" align="center">The page you were looking for was not found!</Typography>
                </ThemeProvider>
            </Paper>
        </Grid>
    )
}

export default NotFound
