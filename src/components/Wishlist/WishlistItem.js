import { Grid, makeStyles, Button, Paper, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import React from 'react'
const useStyles = makeStyles(theme=>({
        mar: {marginTop: theme.spacing(2)},
        pad: { padding : theme.spacing(1) },
        fitWidth: {width: 'fit-content'},
        fillHeight: {height: '100%'}
    })
)
function WishlistItem({ data }) {
    const classes = useStyles()
    return (
        <Grid item xs={6} className={classes.mar}>
            <Paper variant="outlined" className={`${classes.pad} ${classes.fillHeight}`}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}  xl={3}>
                    <img src={"http://127.0.0.1:8000"+data.image} width='100%' />
                </Grid>
                <Grid item md={6} xl={7}>
                    <Typography variant="h3">{data.name}</Typography>
                    <Typography variant="subtitle1">{data.description}</Typography>
                    <Typography variant="h5">₹ {data.price}</Typography>
                    <Rating name="read-only" precision={0.1} value={data.avg_rating*5/100} readOnly />
                    <Typography variant="subtitle1">Category: {data.category.name}</Typography>
                    <Button color="primary" className={classes.mar} variant="contained" fullWidth> Buy Now </Button>
                    <Button color="secondary" className={classes.mar} variant="contained" fullWidth> Add To Cart </Button>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}

export default WishlistItem
