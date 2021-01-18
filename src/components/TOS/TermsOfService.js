import { Grid, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core'
import React from 'react'
import { headingFont } from '../../baseTheme'

const useStyles = makeStyles(theme=>({
    p: {padding: theme.spacing(4)}
}))
function TermsOfService() {
    const classes = useStyles()
    return (
        <Grid container justify="center" alignItems="center" style={{height: '90vh'}}>
            <Paper className={classes.p}>
                <ThemeProvider theme={headingFont}>
                    <Typography variant="h2">Terms of service</Typography>
                </ThemeProvider>
                <Typography variant="h6">
                    Term 1
                </Typography>
                <Typography variant="h6">
                    Term 2
                </Typography>
            </Paper>
        </Grid>
    )
}

export default TermsOfService
