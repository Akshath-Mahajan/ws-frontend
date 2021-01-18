import React, {useEffect, useState} from 'react'
import CartItem from './CartItem'
import { fetchCartItems } from '../../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Button, Grid, makeStyles, Paper, ThemeProvider, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import PaymentModal from '../PaymentModal/PaymentModal'
import { headingFont } from '../../baseTheme'
import LoadingBackdrop from '../Generic/LoadingBackdrop'
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
        price+=((100-data[okd[i]].product.discount)*0.01* data[okd[i]].product.price*data[okd[i]].quantity )
    }
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        setOpen(true)
    }
    const loading = useSelector(state=>state.cart.loading)
    if(loading)
        return (
            <LoadingBackdrop open/>
        )
    return (
        <Grid container spacing={2} alignContent="center">
            {open?<PaymentModal buyNow={false} open handleClose={()=>setOpen(false)} />:""}
            <Grid item container justify="center" xs={12} md={8} spacing={isMobile?0:2}>
            {
            Object.keys(data).length !==0?
            Object.keys(data).map((key)=><CartItem key={key} data={data[key]}/>): 
            <Grid item>
                <ThemeProvider theme={headingFont}>    
                    <Typography variant="h3">
                        Your Bag is empty!
                    </Typography>
                </ThemeProvider>
            </Grid>
            }
            </Grid>
            <Grid item container xs={12} md={4} spacing={isMobile?0:2}>
                <Grid item xs={12}>
                    <Paper variant="outlined" className={`${classes.pad}`}>
                    <ThemeProvider theme={headingFont}>   
                        <Typography variant="h2">Total Price</Typography>
                        <Typography variant="h3">₹ {price}</Typography>
                        <Button color="secondary" disabled={Object.keys(data).length === 0} variant="contained" fullWidth className={`${classes.mar} ${classes.pad}`} onClick={handleSubmit}>Proceed to checkout</Button>
                    </ThemeProvider>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Cart
