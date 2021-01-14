import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from './settings'
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
function Verify() {
    const { str } = useParams()
    const id = str.split('user-id=')[1]
    const [state, setState] = useState(0)
    useEffect(()=>{
        axios.post(DOMAIN+"/api/verify/", {"confirmation-id":id})
        .then(res=>setState(1))
        .catch(err=>setState(-1))
    }, [])
    return (
        <Grid container justify="center" style={{marginTop: '15vh'}}>
            <Grid item>
                {   
                    state===0?
                    <CircularProgress size="15vw" />
                    :
                    state===1?
                        <>
                            <Typography variant="h2" align="center"><CheckCircleOutlineIcon style={{fontSize:'15vw', color:'green'}} /></Typography>
                            <Typography variant="h2" align="center">Success! Please login to your account to proceed</Typography>
                        </>
                        :
                        <>
                            <Typography variant="h2" align="center"><ErrorOutlineIcon style={{fontSize:'15vw', color:'tomato'}} /></Typography>
                            <Typography variant="h2" align="center">Invalid verification ID</Typography>
                        </>
                }

            </Grid>
        </Grid>
    )
}

export default Verify
