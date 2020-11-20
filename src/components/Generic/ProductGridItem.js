import { Grid, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React from 'react'

const useStyles = makeStyles(theme => ({
    pad: {padding: theme.spacing(2)}
    })
)
function ProductGridItem({ data }) {
    const classes = useStyles()
    return (
        <Grid key={data.id} item xs={12} sm={6} md={4} lg={3}>
            <Paper variant="outlined" className={classes.pad}>
                <Grid item align="center">
                    <img src={"http://127.0.0.1:8000"+ data.image} height="275px" />
                </Grid>
                <Typography variant="h4" align="center">
                    {data.name}
                </Typography>
                <Typography variant="h5">₹ {data.price}</Typography>
                <Rating size="small" name="read-only" precision={0.1} value={data.avg_rating*5/100} readOnly />
            </Paper>
        </Grid>
    )
}

export { ProductGridItem }
