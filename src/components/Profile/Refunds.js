import { Button, Grid, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'
import React from 'react'
import { DOMAIN } from '../../settings'

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
    const [data, setData] = React.useState([])
    React.useEffect(
        ()=> {
            Axios.get(DOMAIN+'/api/user-refunds', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
            .then(res=>{
                console.log(res.data)
                setData(res.data)
            })
        }, []
    )
    const outputs = data.map((item)=>{
        return <R data={item} />
    }).filter(item=>item!=null)
    return (
        <Grid item container xs={12} spacing={2}>
            {
                outputs.length?
                outputs:
                <Typography variant="h4" align="center">No refund requests found matching this account!</Typography>
            }
            
        </Grid>
    )
}

export default Refunds
