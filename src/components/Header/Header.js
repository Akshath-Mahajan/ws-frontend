import { AppBar, Button, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Drawer from './Drawer';
import Search from './Search';
import DropdownMenu from './DropdownMenu';
import LoginModal from './LoginModal';
import Modal from './Modal'
const useStyles = makeStyles((theme) => ({
	mgnR:{
		marginRight: theme.spacing(3)
	},
	mb: {
		marginBottom: theme.spacing(1)
	}
})
)
function Header(props) {
	const classes=useStyles()
	const token = useSelector(state => state.user.token)
	const [loginOpen, setLoginOpen] = useState(false)
	const handleClickOpen = () => {setLoginOpen(true)}
    const handleClose = () => {setLoginOpen(false)}
	return (
	<React.Fragment>
	<AppBar>
		<Toolbar>
			<Drawer />
			<Hidden xsDown>
				<Typography variant="h6" component="div" className={classes.mgnR}>Company Name</Typography>
			</Hidden>
			<Search />
			{token?<DropdownMenu />:<Button variant="contained" onClick={handleClickOpen}>Login</Button>}
			<Modal isSignup={false} open={loginOpen} handleClose={handleClose}/>
		</Toolbar>
	</AppBar>
	<Toolbar />
	</React.Fragment>
	)
}

export default Header
