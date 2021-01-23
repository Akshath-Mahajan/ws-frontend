import React, { useEffect, useState } from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Button, useTheme, useMediaQuery, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Typography, makeStyles, Backdrop, CircularProgress, Icon, ThemeProvider} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../../redux';
import axios from 'axios';
import { DOMAIN, RAZORPAY_PK, razorpay_name, razorpay_desc } from '../../settings';
import { useHistory } from "react-router-dom";
import { headingFont } from '../../baseTheme'

const useStyles = makeStyles(theme=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    })
)

function PaymentModal({open, handleClose, product_id, quantity, buyNow, size}) {
    const dispatch = useDispatch()
    let history = useHistory();
    const classes = useStyles()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [isAddress, setIsAddress] = useState(true)
    useEffect(()=>{ if(isAddress) dispatch(fetchAddress()) }, [])
    const addresses = useSelector(state=>state.profile.deliveryAddress.addresses)
    const [addressOpt, setAddressOpt] = useState(-1)
    const [payOpt, setPayOpt] = useState(-1)
    const [loading, setLoading] = useState(false)

    const handlePayRadioChange = (event) => {setPayOpt(parseInt(event.target.value)) };
    const handleAddressRadioChange = (event) => {setAddressOpt(parseInt(event.target.value))}
    const handleNextBtn = () => {
        if(addressOpt !== -1) {
            setIsAddress(false)
        }
    }
    const handleSubmitBtn = async () => {
        if(payOpt == 1){
            setLoading(true)
            axios.post(`${DOMAIN}/api/checkout/`, {
                product_id: product_id, quantity: quantity,
                address_id: addressOpt, buy_now: buyNow, size:size
            }, { headers: {Authorization: "Token "+localStorage.getItem('token')} })
            .then(async (res) => {
                setLoading(false)
                handleClose()
                const options = {
                    key: RAZORPAY_PK,
                    name: razorpay_name,
                    description: razorpay_desc,
                    order_id: res.data.rzpay.id,
                    handler: async (response) => {
                        setLoading(true)
                        axios.post(`${DOMAIN}/api/rp-success/`, response, { headers: {Authorization: "Token "+localStorage.getItem('token')} })
                        .then(res=>{ setLoading(false); history.push('/order-success') })
                        .catch(err => { setLoading(false); history.push('/order-failure')})
                    }
                }
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            })
        }
        if(payOpt == 4){ 
            setLoading(true)
            axios.post(`${DOMAIN}/api/order/`, {
                product_id: product_id,
                quantity: quantity,
                address_id: addressOpt,
                buy_now: buyNow, size: size
            }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
            .then(res => { setLoading(false); history.push('/order-success') })
            .catch(err => { setLoading(false); history.push('/order-failure')})
        }
    }
    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
            {   loading?
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                isAddress?
                <>
                <DialogTitle> 
                    {
                        addresses.length > 0?"Select address":""
                    }
                </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        {
                            addresses.length > 0?
                        <>
                            <Typography> Please select one of the following addresses to continue placing the order </Typography>
                            <RadioGroup value={addressOpt} onChange={handleAddressRadioChange}>
                                {   
                                    
                                    addresses.map((item, idx)=>(
                                        <FormControlLabel key={idx} value={item.id} control={<Radio />} label={item.name} />
                                    ))
                                    
                                }
                            </RadioGroup>
                        </>
                        :
                        <ThemeProvider theme={headingFont}> 
                            <Typography variant="h5" align="center">No addresses found matching this account. Please go to your accounts and add an address before placing an order</Typography>
                        </ThemeProvider>
                        }
                    </FormControl>
                    <DialogActions>
                        <Button variant="outlined" fullWidth onClick={handleNextBtn} disabled={addresses.length===0}>
                            Next
                        </Button>
                    </DialogActions> 
                </DialogContent>
                </>
                :
                <> 
                    <DialogTitle> Select Payment Method </DialogTitle>
                    <DialogContent>
                        <FormControl component="fieldset">
                            <Typography> Please select one of the following payment options to continue placing the order </Typography>
                            <RadioGroup value={payOpt} onChange={handlePayRadioChange}>
                                <FormControlLabel value={1} control={<Radio />} label="Card Payment" />
                                {/* <FormControlLabel value={2} control={<Radio />} label="Paypal" />
                                <FormControlLabel value={3} control={<Radio />} label="PayTM" /> */}
                                <FormControlLabel value={4} control={<Radio />} label="Cash on delivery" />
                            </RadioGroup>
                    </FormControl>
                        <DialogActions>
                            <Button role="link" variant="outlined" fullWidth onClick={handleSubmitBtn}>
                                {payOpt===4?"Place order":"Proceed to pay"}
                            </Button>
                        </DialogActions> 
                    </DialogContent>
                </>
            }
        </Dialog>
    )
}

export default PaymentModal
