import { Collapse, Grid, makeStyles, Paper, Typography, Zoom } from '@material-ui/core'
import React from 'react'
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';
import LOGO from '../../Icons/main.svg'
const useStyles = makeStyles(theme=>({
        fillWidth: {width: '100%'},
        bgDark: {},
        bordered: {paddingTop: theme.spacing(1), paddingBottom: theme.spacing(1), borderTop: '1px solid rgba(200,200,200,0.85)', borderBottom: '1px solid rgba(200,200,200,0.85)'},
        container: {paddingBottom: theme.spacing(2.5)},
        collapse: {height: theme.spacing(5), },
        title: {marginBottom: theme.spacing(1), marginTop: theme.spacing(1)},
        link: {cursor: 'pointer', textDecoration: 'None', color:'inherit'},
        logo: {height: 35}
    })
)
function Footer() {
    const classes = useStyles()
    const [checked, setChecked] = React.useState(false);
    const handleFollowClick = () => {setChecked(!checked)}
    return (
        <div className={`${classes.fillWidth} ${classes.bgDark} ${classes.container}`}>
            <Collapse in={checked}>
                <Grid container justify="space-around" alignItems="center" className={classes.collapse}>
                    <Grid item>
                        <InstagramIcon />
                    </Grid>
                    <Grid item>
                        <MailOutlineIcon />
                    </Grid>
                </Grid>
            </Collapse>
            <Typography variant="h3" align="center" className={classes.title}>
            <Link className={classes.link} to = "">
                <img src={LOGO} className={`${classes.mgnR} ${classes.logo}`} alt="React Logo" />
            </Link>
            </Typography>
            <Grid container className={`${classes.bordered}`}>
                <Grid item container xs={4} align="center">
                    <Grid item xs={12} align="center">
                        <Typography variant="h6" className={classes.link} onClick={handleFollowClick}>Follow us</Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography variant="h6" className={classes.link}>Newsletter</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={4} align="center">
                    <Grid item xs={12} align="center">
                        <Typography variant="h6" className={classes.link}>Terms of service</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={4} align="center">
                    <Grid item xs={12} align="center">
                        <Link to="/contact-us" className={classes.link}>
                            <Typography variant="h6" className={classes.link}>Contact us</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Link to="/about-us" className={classes.link}>
                            <Typography variant="h6" className={classes.link}>About us</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
