import { Button, Grid, makeStyles, OutlinedInput, Paper, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import React from 'react'
const useStyles = makeStyles(theme=>({
        mar: {margin: theme.spacing(1)},
        pad: { padding : theme.spacing(1) },
        fitWidth: {width: 'fit-content'}
    })
)
function CartItem({ data }) {
    const classes = useStyles()
    return (
        <Grid item xs={12}>
            <Paper variant="outlined" className={classes.pad}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}  xl={3}>
                    <img src={"http://127.0.0.1:8000"+data.product.image} width='100%' />
                    <OutlinedInput type="text" inputProps={{style:{textAlign:'center'}}}
                    id="quantity" margin="dense" fullWidth
                    value={data.quantity} readOnly
                    />
                </Grid>
                <Grid item md={6} xl={7}>
                    <Typography variant="h3">{data.product.name}</Typography>
                    <Typography variant="subtitle1">{data.product.description}</Typography>
                    <Typography variant="h5">₹ {data.product.price * data.quantity}</Typography>
                    <Rating name="read-only" precision={0.1} value={data.product.avg_rating*5/100} readOnly />
                    <Typography variant="subtitle1">Category: {data.product.category.name}</Typography>
                    <Button color="secondary" variant="contained" fullWidth> Remove </Button>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}

export default CartItem
