import React, {useEffect} from 'react'
import CartItem from './CartItem'
import { fetchCartItems } from '../../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Button, Grid, makeStyles, Paper, Typography, useMediaQuery, useTheme } from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    mar: {marginTop: theme.spacing(2)},
    pad: { padding : theme.spacing(2) },
    fitWidth: {width: 'fit-content'},
    fillWidth: {width: '100%'}
})
)

function Cart() { 
    const dispatch = useDispatch()
    useEffect(()=>dispatch(fetchCartItems()), [])
    const classes = useStyles()
    const data = useSelector(state=>state.cart.cart)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {defaultMatches: true});
    let price = 0;
    let okd = Object.keys(data)
    for(let i = 0; i < okd.length; i++){
        price+=(data[okd[i]].product.price*data[okd[i]].quantity)
    }
    return (
        <Grid container spacing={2} alignContent="center">
            <Grid item container justify="center" xs={12} md={8} spacing={isMobile?0:2}>
            {
            Object.keys(data).length !==0?
            Object.keys(data).map((key)=><CartItem key={key} data={data[key]}/>): 
            <Grid item>
                    <Typography variant="h3">
                        Your Cart is empty!
                    </Typography>
                </Grid>
            }
            </Grid>
            <Grid item container xs={12} md={4} spacing={isMobile?0:2}>
                <Grid item xs={12}>
                    <Paper variant="outlined" className={`${classes.pad}`}>
                        <Typography variant="h2">Total Price</Typography>
                        <Typography variant="h3">₹ {price}</Typography>
                        <Button color="secondary" disabled={Object.keys(data).length === 0} variant="contained" fullWidth className={`${classes.mar} ${classes.pad}`}>Proceed to checkout</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Cart
