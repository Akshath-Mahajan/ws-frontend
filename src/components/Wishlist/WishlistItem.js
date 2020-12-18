import { Grid, makeStyles, Button, Paper, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCartFromWishlist, deleteWishlistItem } from '../../redux'
import { DOMAIN } from '../../settings'
const useStyles = makeStyles(theme=>({
        mar: {marginTop: theme.spacing(2)},
        pad: { padding : theme.spacing(1) },
        fitWidth: {width: 'fit-content'},
        fillHeight: {height: '100%'},
        img: {
            margin: theme.spacing(1),
            width: '100%',
            [theme.breakpoints.down('sm')]:{
                width:'auto',
                height: 275,
            }
        }
    })
)
function WishlistItem({ data }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const addToCart = () => {dispatch(addToCartFromWishlist(data.id))}
    const removeItem = () => {dispatch(deleteWishlistItem(data.id))}
    return (
        <Grid container item xs={12} sm={6} className={classes.mar}>
            <Paper variant="outlined" className={`${classes.pad} ${classes.fillHeight}`}>
            <Grid container spacing={2}>
                <Grid container justify="center" alignItems="center" item xs={12} md={4} xl={3}>
                    <img className={classes.img} alt={data.name} src={DOMAIN+data.image} />
                </Grid>
                <Grid item xs={12} md={6} xl={7}>
                    <Typography variant="h3">{data.name}</Typography>
                    <Typography variant="subtitle1">{data.description}</Typography>
                    <Typography variant="h5">₹ {data.price}</Typography>
                    <Rating name="read-only" precision={0.1} value={data.avg_rating*5/100} readOnly />
                    <Typography variant="subtitle1">Category: {data.category.name}</Typography>
                    <Button color="primary" className={classes.mar} variant="contained" fullWidth> Buy Now </Button>
                    <Button onClick={addToCart} color="secondary" className={classes.mar} variant="contained" fullWidth> Add To Cart </Button>
                    <Button onClick={removeItem} color="secondary" className={classes.mar} variant="contained" fullWidth> Remove from cart </Button>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}

export default WishlistItem
