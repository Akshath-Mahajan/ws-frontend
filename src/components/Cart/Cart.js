import React, {useEffect} from 'react'
import CartItem from './CartItem'
import { fetchCartItems } from '../../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

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
    useEffect(()=>dispatch(fetchCartItems()), [])
    let price = 0;
    for(let i = 0; i < data.length; i++){
        price = price + (data[i].quantity*data[i].product.price)
    }
    return (
        <Grid container spacing={2} alignContent="center">
            <Grid item container xs={12} lg={8} spacing={2}>
                {data.map(item=><CartItem key={item.id} data={item}/>)}
            </Grid>
            <Grid item container xs={12} lg={4} spacing={2}>
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
