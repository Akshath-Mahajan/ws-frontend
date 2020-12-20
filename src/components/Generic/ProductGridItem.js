import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React from 'react'
import { Link } from 'react-router-dom'
import { DOMAIN } from '../../settings'
const useStyles = makeStyles(theme => ({
    pad: {padding: theme.spacing(2)},
    link: {textDecoration: 'None'},
    img: {height: "275px", maxWidth: '100%'}
    })
)
function ProductGridItem({ data }) {
    const classes = useStyles()
    return (
        <Grid key={data.id} item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to={`/product/${data.id}`}>
            <Paper variant="outlined" className={classes.pad}>
                <Grid item align="center">
                    <img alt={data.name} src={DOMAIN+ data.image} className={classes.img} />
                </Grid>
                <Typography variant="h4" align="center">
                    {data.name}
                </Typography>
                <Typography variant="h5">₹ {data.price}</Typography>
                <Rating size="small" name="read-only" precision={0.1} value={data.avg_rating*5/100} readOnly />
            </Paper>
            </Link>
        </Grid>
    )
}

export { ProductGridItem }
