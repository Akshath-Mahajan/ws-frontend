import {Grid, Paper, Typography, Button} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function HelpPane() {
    return (
        <Grid item container xs={12} spacing={2}>
            <Paper variant="outlined" style={{width: '100%', padding: 12}}>
                <Typography variant="h3" style={{marginBottom:'12px'}}>FAQs:</Typography>

                <Typography style={{marginBottom: 12}}>
                    <Typography><strong>Q. How to request a refund or replacement</strong></Typography>
                    <Typography> To request a refund, please send us an email or call us directly </Typography>
                </Typography>
                <Typography style={{marginBottom: 12}}>
                    <Typography><strong>Q. My payment was not recorded</strong></Typography>
                    <Typography>Please go to your orders, take a note of the order id. Then proceed to contact us with this id, along with the bank transaction details and we will look into the matter.</Typography>
                </Typography>

                <Link to="/contact-us" style={{textTransform: 'None', color: 'initial', textDecoration: 'None'}}>
                    <Button fullWidth variant="contained" color="primary">
                        Contact us for more support
                    </Button>
                </Link>
            </Paper>
        </Grid>
    )
}

export default HelpPane
