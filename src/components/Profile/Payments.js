import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { fetchPayments } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
function P({data}){

    return (
    <Button fullWidth style={{padding:0, marginTop: 12, marginBottom: 12, textTransform: "None"}}>
        <Paper variant="outlined" style={{width: '100%', padding: '12px'}}>
            <Typography variant="h5" align="left">
                Order #{data.order}
                <Typography style={{float: 'right'}}>
                    <Typography variant="h6">
                        Amount Paid: ₹{data.amt_paid}
                    </Typography>
                    <Typography variant="h6">
                        Change: ₹{data.change}
                    </Typography>
                </Typography>
            </Typography>
            <Typography align="left">
                Date: {data.created_at.split('T')[0]}
            </Typography>
        </Paper>
    </Button>
    )
}
function Payments() {
    const dispatch = useDispatch()
    useEffect(()=> { dispatch(fetchPayments()) }, [])
    
    const data = useSelector(state=>state.profile.payments.payments)
    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
            {
                data.length?
                data.map(item => <P data={item} />)
                :
                <Typography variant="h4" align="center">No payments found matching this account!</Typography>
            }
            </Grid>
        </Grid>
    )
}

export default Payments
