import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import HelpIcon from '@material-ui/icons/Help';
import DisplayCard from './DisplayCard';
const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '20vh',
            [theme.breakpoints.down('xs')]:{marginTop: 'initial'}
        },
        icon: {fontSize: '8vh',},
    })
)
function ContactUs() {
    const classes = useStyles()
    return (
        <Grid container spacing={2} justify="center" className={classes.root}>
            <Grid container item xs={12} sm={6} lg={4} justify="center">
                <DisplayCard header="@some_username" subtext="Follow us on instagram" icon={<InstagramIcon className={classes.icon}/>} />
            </Grid>
            <Grid container item xs={12} sm={6} lg={4} justify="center">
            <DisplayCard header="asdf@gmail.com" subtext="Send us an email" icon={<EmailIcon className={classes.icon}/>} />
            </Grid>
            {/* <Grid container item xs={12} sm={6} lg={4} justify="center">
                <DisplayCard header="Get Help" subtext="" icon={<HelpIcon className={classes.icon}/>} />
            </Grid> */}
        </Grid>
    )
}

export default ContactUs
