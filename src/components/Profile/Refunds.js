import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchRefunds } from '../../redux'

function R({data}){
    return (
        <Button fullWidth style={{padding:0, marginTop: 12, marginBottom: 12, textTransform: "None"}}>
            <Paper variant="outlined" style={{width: '100%', padding: '12px'}}>
                <Typography variant="h5" align="left">
                    Request #{data.id}
                    <Typography style={{float: 'right'}}>
                        <Typography variant="h6">
                            Amount: ₹{data.amount}
                        </Typography>
                        <Typography style={{float:'right'}}>
                            <strong>Status: </strong>{data.granted?"Refunded": "Requested"}
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

function Refunds() {
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchRefunds()) }, [])

    const data = useSelector(state=>state.profile.payments.refunds)
    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
            {
                data.length?
                data.map(item=><R data={item} />)
                :
                <Typography variant="h4" align="center">No refund requests found matching this account!</Typography>
            }
            </Grid>
        </Grid>
    )
}

export default Refunds
