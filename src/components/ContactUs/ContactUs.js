import { Box, Button, Card, CardMedia, FormControl, Grid, IconButton, makeStyles, Snackbar, TextField, ThemeProvider, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { ValidateEmail } from '../../formValidators';
import {contact_img_url, DOMAIN, helpline_number, instagram_username} from '../../settings'
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { headingFont } from '../../baseTheme'
import { email_address } from '../../settings'

const useStyles = makeStyles(theme => ({
        root: {},
        icon: {fontSize:'inherit', verticalAlign: -6, marginRight: theme.spacing(1)},
        cardRoot: { position: 'relative', width: '100%' },
        cardContainer: { display: 'grid' },
        cardMedia: { gridArea: '1/1' },
        overlay: {
            position: 'absolute',
            top: '1px',
            left: '1px',
            right: '1px',
            bottom: '1px',
            color: '#F8F8FF',
        },
        bigMarginTop: {
            marginTop: theme.spacing(5)
        },
        mr: {marginRight: theme.spacing(2)},
        smallMarginTop: {marginTop: theme.spacing(1)},
        dark : {backgroundColor: 'rgba(0,0,0,0.35)',},
        light : {backgroundColor: 'rgba(0,0,0,0.15)',}
    })
)
function ContactUs() {
    const classes = useStyles()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")

    const [emailErr, setEmailErr] = useState(false)
    const handleEmailChange = (e) => {
        setEmailErr(false)
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        if(fname===""){ setFname(null) }
        if(lname===""){ setLname(null) }
        if(!ValidateEmail(email)){ setEmailErr(true) }
        if(text===""){ setText(null) }
        if(!(text==="") && !(lname==="") && !(text==="") && ValidateEmail(email)){
            axios.post(`${DOMAIN}/api/contact-us/`, {first_name:fname, last_name: lname, email: email, text: text})
            setFname("")
            setLname("")
            setEmail("")
            setText("")
            setSnack(true)
        }
    }
    const [snack, setSnack] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(false);
    };
    return (
        <Grid container justify="space-between" className={classes.root}>
            <Grid container item xs={12} sm={6}>
                <Card className={`${classes.cardRoot} ${classes.mr} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    style={{height: '91vh'}}
                    image={contact_img_url}
                />
                <div className={`${classes.overlay} ${classes.dark}`}>
                    <ThemeProvider theme={headingFont}>
                        <Typography variant="h2" align="center" style={{marginTop: '30vh'}}>Find us on</Typography>
                    </ThemeProvider>
                    
                    <Typography variant="h5" align="center">
                        <MailOutlineIcon className={classes.icon} /> 
                        <Typography variant="h6" style={{display:'inline'}}>
                            {email_address}
                        </Typography>
                    </Typography>
                    <Typography variant="h5" align="center">
                        <InstagramIcon className={classes.icon} /> 
                        <Typography variant="h6" style={{display:'inline'}}>
                            {instagram_username}
                        </Typography>
                    </Typography>
                    <Typography variant="h5" align="center">
                        <HelpOutlineIcon className={classes.icon} /> 
                        <Typography variant="h6" style={{display:'inline'}}>
                            {helpline_number}
                        </Typography>
                    </Typography>
                </div>
            </Card>
            </Grid>
            <Grid container item xs={12} sm={6}>
                <form>
                    <ThemeProvider theme={headingFont}>
                        <Typography variant="h3" align="center">Send us something directly</Typography>
                    </ThemeProvider>
                    <FormControl fullWidth className={classes.bigMarginTop}>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={6}>
                                <TextField 
                                    variant="outlined" margin="dense" label="First Name" 
                                    fullWidth value={fname} onChange={(e)=>setFname(e.target.value)}
                                    error={fname===null}
                                    helperText={fname===null?"This field can't be empty!": ""} 
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    variant="outlined" margin="dense" label="Last Name" 
                                    fullWidth value={lname} onChange={(e)=>setLname(e.target.value)}
                                    error={lname===null}
                                    helperText={lname===null?"This field can't be empty!": ""} 
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                    <FormControl fullWidth className={classes.smallMarginTop}>
                        <Grid container item xs={12} spacing={1}>
                            <TextField 
                                variant="outlined" margin="dense" label="Email" type="email" 
                                fullWidth value={email} onChange={handleEmailChange}
                                error={emailErr}
                                helperText={emailErr?"Invalid email. Please enter a valid email to proceed": ""} 
                            />
                        </Grid>
                    </FormControl>
                    <FormControl fullWidth className={classes.smallMarginTop}>
                        <Grid container item xs={12} spacing={1}>
                            <TextField 
                                multiline rows={5} variant="outlined" margin="dense" label="Your message" 
                                fullWidth value={text} onChange={(e)=>setText(e.target.value)}
                                error={text===null}
                                helperText={text===null?"Please enter your message": ""} 
                            />
                        </Grid>
                    </FormControl>
                    <FormControl fullWidth className={classes.smallMarginTop}>
                        <Grid container item xs={12} spacing={1}>
                            <Button onClick={handleSubmit} color="primary" variant="contained" size="large" fullWidth> Send message! </Button>
                        </Grid>
                    </FormControl>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={snack}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}
                    message={<Typography> <CheckCircleIcon style={{verticalAlign:-2, fontSize:'inherit', color:'green'}}/> Your message has been sent</Typography>}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Grid>
        </Grid>
    )
}

export default ContactUs
