import { Button, Collapse, Grid, ListItem, ListItemText, Paper, Typography, ThemeProvider, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../../redux/Profile/actions'
import { DOMAIN } from '../../settings'
import { useSelector, useDispatch } from 'react-redux'
import { headingFont } from '../../baseTheme'
function O({data}){
    const [open, setOpen] = useState(false)
    const [itemData, setItemData] = useState([])
    const handleClick = () => {
        if(!open && itemData.length === 0)
        axios.get(DOMAIN+"/api/order/"+data.id, { headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res=>{
            setItemData(res.data.order_items)
        })
        setOpen(!open)
    }
    return (
        <>
        <Button onClick={handleClick} fullWidth style={{padding:0, marginTop: 12, marginBottom: 12}}>
            <Paper variant="outlined" style={{width: '100%', padding: '12px'}}>
            <ThemeProvider theme={headingFont}>
                <Typography variant="h5" align="left">
                    Order #{data.id}
                    <Typography variant="h5" style={{float: 'right'}}>
                        ₹{data.total}
                    </Typography>
                </Typography>
            </ThemeProvider>
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
                                        <strong>Price: </strong>₹{item.final_price} per
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography>
                                        <strong>Quantity: </strong>{item.quantity}
                                    </Typography>
                                </ListItemText>
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
    const loading = useSelector(state=>state.profile.deliveryAddress.loading)
    if(loading)
        return <Grid item container xs={12} spacing={2} justify="center" align="center">
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
            {
            outputs.length?
            outputs.map(item => <O key={item.id} data={item} />)
            :
            <ThemeProvider theme={headingFont}>
            <Typography variant="h4" align="center">No orders found matching this account!</Typography>
            </ThemeProvider>
            }
        </Grid>
    )
}

export default Orders
