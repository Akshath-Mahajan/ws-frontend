import { Button, Grid, Collapse, TextField, Typography, IconButton, Paper, Box, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DOMAIN } from '../../settings';
import Axios from 'axios'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
function Address({data, editing}){
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {setOpen(!open)}
    const editClick = (e) => {
        e.stopPropagation()
        console.log("editing")
    }
    const deleteClick = (e)=>{
        e.stopPropagation()
        console.log("deleting")
    } 
    return (
    <Paper variant="outlined" style={{width: '100%', marginBottom: '12px'}}>
        <ListItem variant="button" onClick={handleClick}>
            <ListItemText>
                <Typography button><strong>Name:</strong> {data.name}</Typography>
            </ListItemText>
            <IconButton onClick={editClick}> <EditIcon/> </IconButton>
            <IconButton onClick={deleteClick}> <DeleteIcon /> </IconButton>
            <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit style={{width: '100%'}}>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" defaultValue={data.city} label="City Name" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" defaultValue={data.details} label="Address" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" defaultValue={data.landmark} label="Landmark" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" defaultValue={data.pincode} label="Pincode" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" defaultValue={data.locality} label="Locality" fullWidth margin="dense"/>
            </ListItem>
        </Collapse>
    </Paper>
    )
}
function DeliveryAddress() {
    const [address, setAddress] = React.useState([])
    React.useEffect(()=>{
        Axios.get(DOMAIN+'/api/address', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res => {
            console.log(res.data)
            setAddress(res.data)
        })
    }, [])
    return (
        <Grid item container xs={12} spacing={2}>
            {
            address.length?
            address.map((item, idx) => <Address key={idx} data={item} />)
            :
            <Typography variant="h4" align="center">No address found matching this account!</Typography>
            }
            <Paper variant="outlined" style={{width: '100%'}}>
                <Button color="primary" variant="contained" fullWidth>
                    Add more
                </Button>
            </Paper>
        </Grid>
    )
}

export default DeliveryAddress
