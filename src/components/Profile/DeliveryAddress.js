import { Button, Grid, Collapse, TextField, Typography, IconButton, Paper, Box, ListItem, ListItemText } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAddress, openAddressForm, deleteAddress, saveAddress, cancelNewAddress } from '../../redux'
import { notEmpty, ValidatePin } from '../../formValidators'
function Address({data, isNew}){
    const dispatch = useDispatch()
    const [open, setOpen] = useState(isNew || false)
    const [editing, setEditing] = useState(isNew || false)
    
    //Temp state while editing
    const [name, setName] = useState(data.name || "")
    const [city, setCity] = useState(data.city || "")
    const [details, setDetails] = useState(data.details || "")
    const [landmark, setLandmark] = useState(data.landmark || "")
    const [pincode, setPincode] = useState(data.pincode || "")
    const [locality, setLocality] = useState(data.locality || "")
    
    //Validity check
    const valid = () => notEmpty(name) && notEmpty(details) && ValidatePin(pincode) && notEmpty(locality) && notEmpty(city)
    //Actions for individual address

    const toggleOpenDropdown = (e) => {
        if(valid()){ //We should only close for valid address
            if(editing){ saveClick(e) }
            else { setOpen(!open) }
        }
    } 
    const editClick = (e) => {
        e.stopPropagation()
        setEditing(true)
        setOpen(true)
    }
    const saveClick = (e) => {
        e.stopPropagation()
        if(valid()){
            setEditing(false)
            setOpen(false)
            dispatch(saveAddress({
                    id: data.id || null, name: name,
                    city: city, details: details, landmark: landmark, 
                    pincode: pincode, locality: locality
                })
            )
        }
    }
    const deleteClick = (e)=>{
        e.stopPropagation()
        dispatch(deleteAddress(data.id))
    }
    const cancelAddNew = (e) => {
        dispatch(cancelNewAddress())
    }
    return (
    <Paper variant="outlined" style={{width: '100%', marginBottom: '12px'}}>
        <ListItem variant="button" onClick={toggleOpenDropdown}>
            {
            editing?
            <ListItem>
                <TextField disabled={!editing} variant="outlined" error={!notEmpty(name)} value={name} onChange={(e)=>setName(e.target.value)} onClick={(e) => e.stopPropagation()} label="Name" fullWidth margin="dense"/>
            </ListItem>
            :
            <ListItemText>
                <Typography button><strong>Name:</strong> {name}</Typography>
            </ListItemText>
            }
            <IconButton onClick={editing?saveClick:editClick}> {editing?<DoneIcon /> : <EditIcon/>} </IconButton>
            <IconButton onClick={isNew?cancelAddNew:deleteClick}> {isNew?<ClearIcon />:<DeleteIcon />} </IconButton>
            <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit style={{width: '100%'}}>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" error={!notEmpty(city)} value={city} onChange={(e)=>setCity(e.target.value)} label="City Name" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" error={!notEmpty(details)} value={details} onChange={(e)=>setDetails(e.target.value)} label="Address" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" value={landmark} onChange={(e)=>setLandmark(e.target.value)} label="Landmark" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" error={!ValidatePin(pincode)} value={pincode} onChange={(e)=>setPincode(e.target.value)} label="Pincode" fullWidth margin="dense"/>
            </ListItem>
            <ListItem>
                <TextField disabled={!editing} variant="outlined" error={!notEmpty(locality)} value={locality} onChange={(e)=>setLocality(e.target.value)} label="Locality" fullWidth margin="dense"/>
            </ListItem>
        </Collapse>
    </Paper>
    )
}
function DeliveryAddress() {
    useEffect(() => { dispatch(fetchAddress()) }, [])
    const dispatch = useDispatch()
    const addresses = useSelector(state=>state.profile.deliveryAddress.addresses)
    const addingAddress = useSelector(state=>state.profile.deliveryAddress.addingAddress)
    const addAddress = () => { dispatch(openAddressForm()) }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                {
                addresses.length?
                addresses.map((item, idx) => <Address key={idx} data={item} />)
                :
                <Typography variant="h4" align="center">No address found matching this account!</Typography>
                }
            </Grid>
            <Grid item xs={12}>
            {
            addingAddress?
            <Address data={{}} isNew />    
            :
            <Paper variant="outlined" style={{width: '100%'}}>
                <Button color="primary" variant="contained" fullWidth onClick={ addAddress }>
                    Add more
                </Button>
            </Paper>
            }
            </Grid>
        </Grid>
    )
}

export default DeliveryAddress
