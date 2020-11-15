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
    const classes = useStyles()
    const dispatch = useDispatch()
    const data = useSelector(state=>state.cart.cart)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {defaultMatches: true});
    useEffect(()=>dispatch(fetchCartItems()), [])
    let price = 0;
    Object.keys(data).map((key) => {price+=(data[key].product.price*data[key].quantity)})
    return (
        <Grid container spacing={2} alignContent="center">
            <Grid item container xs={12} lg={8} spacing={isMobile?0:2}>
            {Object.keys(data).map((key)=><CartItem key={key} data={data[key]}/>)}
            </Grid>
            <Grid item container xs={12} lg={4} spacing={isMobile?0:2}>
                <Grid item xs={12}>
                    <Paper variant="outlined" className={`${classes.pad}`}>
                        <Typography variant="h2">Total Price</Typography>
                        <Typography variant="h3">₹ {price}</Typography>
                        <Button color="secondary" variant="contained" fullWidth className={`${classes.mar} ${classes.pad}`}>Proceed to checkout</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Cart
