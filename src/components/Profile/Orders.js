import { Button, Collapse, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../../redux/Profile/actions'
import { DOMAIN } from '../../settings'
import { useSelector, useDispatch } from 'react-redux'

function O({data}){
    const [open, setOpen] = useState(false)
    const [itemData, setItemData] = useState([])
    
    const handleClick = () => {
        if(!open)
        axios.get(DOMAIN+"/api/order/"+data.id, { headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res=>setItemData(res.data.order_items))
        
        setOpen(!open)
    }
    const created_date = new Date(data.created_at.split("T")[0])
    const today = new Date();
    const diffDays = Math.ceil(Math.abs(created_date - today)/ (1000 * 60 * 60 * 24)); 
    return (
        <>
        <Button onClick={handleClick} fullWidth style={{padding:0, marginTop: 12, marginBottom: 12}}>
            <Paper variant="outlined" style={{width: '100%', padding: '12px'}}>
                <Typography variant="h5" align="left">
                    Order #{data.id}
                    <Typography variant="h5" style={{float: 'right'}}>
                        ₹{data.total}
                    </Typography>
                </Typography>
            </Paper>
        </Button>
        <Collapse in={open} timeout="auto" unmountOnExit style={{width: '100%'}}>
            <Paper variant="outlined">
                {
                    itemData.map(
                        (item)=>(
                            <ListItem key={item.id} alignItems="center">
                                <ListItemText>
                                    <Typography>
                                        <strong>Name: </strong>{item.name}
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography>
                                        <strong>Price: </strong>{item.final_price}
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography>
                                        <strong>Quantity: </strong>{item.quantity}
                                    </Typography>
                                </ListItemText>
                                {
                                diffDays <= 1?
                                    <ListItemText>
                                            <Button variant="outlined">
                                                Refund
                                            </Button>
                                    </ListItemText>
                                :
                                    ""
                                }
                            </ListItem>
                        )
                    )
                }
            </Paper>
        </Collapse>
        </>
    )
}
function Orders({ type }) {
    //type: 0 => all, 1=> not delivered/live, 2=>delivered
    const dispatch = useDispatch()
    useEffect(()=> dispatch(fetchOrders()), [])
    const orders = useSelector(state=>state.profile.orders.orders)
    let outputs = []
    if(type===0)
        outputs = orders 
    if(type===1)
        outputs = orders.filter(item => !item.delivered)
    if(type===2)
        outputs = orders.filter(item => item.delivered)
    
    return (
        <Grid item container xs={12} spacing={2}>
            {
            outputs.length?
            outputs.map(item => <O key={item.id} data={item} />)
            :
            <Typography variant="h4" align="center">No orders found matching this account!</Typography>
            }
        </Grid>
    )
}

export default Orders
