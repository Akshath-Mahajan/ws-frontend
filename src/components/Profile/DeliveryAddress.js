import { Button, Grid, Collapse, TextField, Typography, IconButton, Paper, Box, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DOMAIN } from '../../settings';
import Axios from 'axios'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
function Address({data, edit}){
    const [open, setOpen] = React.useState(edit || false)
    const [editing, setEditing] = React.useState(edit || false)
    const handleClick = () => {
        setOpen(!open)
        if(editing){setEditing(false)}
    }
    const toggleEditing = () => {setEditing(!editing)}
    const editClick = (e) => {
        e.stopPropagation()
        setOpen(true)
        toggleEditing()
    }
    const saveClick = (e) => {
        e.stopPropagation()
        toggleEditing()
        console.log('saved')
    }

    const deleteClick = (e)=>{
        e.stopPropagation()
        Axios.delete(DOMAIN+"/api/address", {
            headers: {Authorization: "Token "+localStorage.getItem('token')},
            data: {
                pk: data.id
            }
          });
    } 
    return (
    <Paper variant="outlined" style={{width: '100%', marginBottom: '12px'}}>
        <ListItem variant="button" onClick={handleClick}>
            <ListItemText>
                <Typography button><strong>Name:</strong> {data.name}</Typography>
            </ListItemText>
            <IconButton onClick={editing?saveClick:editClick}> {editing?<DoneIcon /> : <EditIcon/>} </IconButton>
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
    const [form, setForm] = React.useState(false)
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
            
                {
                    form?
                <Address data={{}} edit />    
                :
                <Paper variant="outlined" style={{width: '100%'}}>
                    <Button color="primary" variant="contained" fullWidth onClick={()=>setForm(true)}>
                        Add more
                    </Button>
                </Paper>
                }
            
        </Grid>
    )
}

export default DeliveryAddress
