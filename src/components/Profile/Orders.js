import { Button, Collapse, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'
import React from 'react'
import { DOMAIN } from '../../settings'
function O({data}){
    const [open, setOpen] = React.useState(false)
    const [itemData, setItemData] = React.useState([])
    const handleClick = () => {
        Axios.get(DOMAIN+"/api/order/"+data.id, { headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res=>{
            console.log(res.data.order_items)
            setItemData(res.data.order_items)
        })
        setOpen(!open)
    }
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
           {/* 
           discount: 0
            final_price: 450
            id: 6
            initial_price: 450
            name: "Shirt 1"
            order: 7
            product: 7
            quantity: 1
           */}
            <Paper variant="outlined">
                {
                    itemData.map(
                        (item)=>(
                            <ListItem alignItems="center">
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
