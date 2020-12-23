import { Button, Grid, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'
import React from 'react'
import { DOMAIN } from '../../settings'
function O({data}){
    return (
        <Button fullWidth style={{padding:0, marginTop: 12, marginBottom: 12}}>
            <Paper variant="outlined" style={{width: '100%', padding: '12px'}}>
                <Typography variant="h5" align="left">
                    Order #{data.id}
                    <Typography variant="h5" style={{float: 'right'}}>
                        ₹{data.total}
                    </Typography>
                </Typography>
            </Paper>
        </Button>
    )
}
function Orders({ type }) {
    //type: 0 => all, 1=> live, 2=>delivered
    const [orders, setOrders] = React.useState([])
    React.useEffect(()=>{
        Axios.get(DOMAIN+'/api/user-orders', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res => {
            setOrders(res.data)
        })
    }, [])
    const outputs = orders.map((item, idx) => {
        const boo1 = type===0
        const boo2 = type===1 && !item.delivered
        const boo3 = type===2 && item.delivered
        if(boo1 || boo2 || boo3)
            return <O key={idx} data={item} />
        return null
    }).filter(item=>item != null)
    return (
        <Grid item container xs={12} spacing={2}>
            {
            outputs.length?
            outputs
            :
            <Typography variant="h4" align="center">No orders found matching this account!</Typography>
            }
        </Grid>
    )
}

export default Orders
