import React, { useEffect, useState } from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Button, useTheme, useMediaQuery, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Typography} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../../redux';
import axios from 'axios';
import { DOMAIN } from '../../settings';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HoSBoEH2zpc9mRP6H0kPlnLL5V82dZSMYqvnl3L9JwnDDo4Rfgr6UNwu9HaMXtI7LwKJaSODX4QZkZYx3596pZz00opn1fib2');
function PaymentModal({open, handleClose, product_id, quantity, buyNow}) {
    const dispatch = useDispatch()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [isAddress, setIsAddress] = useState(true)
    useEffect(()=>{ if(isAddress) dispatch(fetchAddress()) }, [])
    const addresses = useSelector(state=>state.profile.deliveryAddress.addresses)
    const [addressOpt, setAddressOpt] = useState(-1)
    const [payOpt, setPayOpt] = useState(-1)
    const handlePayRadioChange = (event) => {setPayOpt(parseInt(event.target.value)) };
    const handleAddressRadioChange = (event) => {setAddressOpt(parseInt(event.target.value))}
    const handleNextBtn = () => {
        if(addressOpt !== -1) {
            setIsAddress(false)
        }
    }
    const handleSubmitBtn = async () => {
        if(payOpt == 1){
            const stripe = await stripePromise;
            axios.post(`${DOMAIN}/api/checkout/`, {
                product_id: product_id,
                quantity: quantity,
                address_id: addressOpt,
                buy_now: buyNow
            }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
            .then(async (res) => {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.sess_id,
                });
                if (result.error) { }
            })
        }
        if(payOpt == 4){ 
            //COD
        }

    }
    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
            {
                isAddress?
                <>
                <DialogTitle> Select an address </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <Typography> Please select one of the following addresses to continue placing the order </Typography>
                        <RadioGroup value={addressOpt} onChange={handleAddressRadioChange}>
                            {
                                addresses.map((item, idx)=>(
                                    <FormControlLabel key={idx} value={item.id} control={<Radio />} label={item.name} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <DialogActions>
                        <Button variant="outlined" fullWidth onClick={handleNextBtn}>
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
