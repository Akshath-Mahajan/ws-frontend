import { Button, Grid, makeStyles, OutlinedInput, Paper, Typography, IconButton } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { DOMAIN } from '../../settings'
import { updateCartItems, deleteCartItems } from '../../redux'
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme=>({
        mar: {margin: theme.spacing(1)},
        pad: { padding : theme.spacing(1) },
        fitWidth: {width: 'fit-content'},
        img: {
            margin: theme.spacing(1),
            width: '100%',
            [theme.breakpoints.down('xs')]:{
                width:'auto',
                height: 275,
            }
        },
        link: {textDecoration: 'None', color: 'initial'}
    })
)
function CartItem({ data }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleDecrement = () => { dispatch(updateCartItems(data.product.id, data.quantity - 1)) }
    const handleIncrement = () => { dispatch(updateCartItems(data.product.id, data.quantity + 1)) }
    const removeItem = () => { dispatch(deleteCartItems(data.product.id)) }
    return (
        <Grid item xs={12}>
            
            <Paper variant="outlined" className={classes.pad}>
            <Grid container spacing={4}>
                <Grid item container justify="center" alignItems="center" xs={12} sm={4} xl={3}>
                    <Link className={classes.link} to={`/product/${data.product.id}`}>
                        <Grid item container xs={12} justify="center" alignItems="center">
                            <img className={classes.img} alt={data.product.name} src={DOMAIN+data.product.image} />
                        </Grid>
                    </Link>
                    <Grid container item xs={12}>
                        <Grid item xs={3} container alignItems="center" justify="center">
                            <Grid item>
                                <IconButton onClick={handleDecrement}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container alignItems="center" justify="center">
                            <Grid item>
                                <OutlinedInput type="text" inputProps={{style:{textAlign:'center'}}}
                                margin="dense" fullWidth
                                value={data.quantity} readOnly
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={3} alignItems="center" justify="center">
                            <Grid item>
                                <IconButton onClick={handleIncrement}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} xl={7}>
                    <Link className={classes.link} to={`/product/${data.product.id}`}>
                        <Typography variant="h3">{data.product.name}</Typography>
                        <Typography variant="subtitle1">{data.product.description}</Typography>
                        <Typography variant="h5">₹ {data.product.price * data.quantity}</Typography>
                        <Rating name="read-only" precision={0.1} value={data.product.avg_rating*5/100} readOnly />
                        <Typography variant="subtitle1">Category: {data.product.category.name}</Typography>
                    </Link>
                    <Button onClick={removeItem} color="secondary" variant="contained" fullWidth> Remove </Button>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}

export default CartItem
