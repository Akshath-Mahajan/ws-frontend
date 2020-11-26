import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles(theme => ({
    root: {height: '45vh'},
    w: {width: '100%'},
    text: {textAlign: 'center'},
    mb: {marginBottom: theme.spacing(2)}
})
)
function DisplayCard(props) {
    const classes = useStyles()
    return (
        <Paper className={classes.w}>
        <Grid item container justify="center" alignContent="center" 
        className={classes.root}>
            <Grid item container xs={12} justify="center">
                <Grid item>
                    {props.icon}  
                </Grid>
            </Grid>
            <Grid item xs={12} container justify="center"> 
                <Typography variant="h4">
                    <strong>
                        {props.header}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={12} container justify="center"> 
                <Typography variant="h6">
                    {props.subtext}
                </Typography>
            </Grid>
        </Grid>
            </Paper>
    )
}

export default DisplayCard
