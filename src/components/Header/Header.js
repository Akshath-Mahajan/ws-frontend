import { AppBar, Button, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from './Drawer';
import Search from './Search';
import DropdownMenu from './DropdownMenu';
import LoginModal from './LoginModal';
import { openLoginModal } from '../../redux/User/actions';
import SignupModal from './SignupModal';
import LOGO from '../../Icons/main.svg'
const useStyles = makeStyles((theme) => ({
	mgnR:{
		marginRight: theme.spacing(3)
	},
	mb: {
		marginBottom: theme.spacing(1)
	},
	logo: {
		height: theme.spacing(5)
	},
	appbar: { backgroundColor: "#EFE4CB"}
})
)
function Header(props) {
	const classes=useStyles()
	const dispatch = useDispatch()
	const token = useSelector(state => state.user.token)
	const handleClickOpen = () => { dispatch(openLoginModal()) }
    // const handleClose = () => {setLoginOpen(false)}
	return (
	<React.Fragment>
	<AppBar>
		<Toolbar className={classes.appbar}>
			<Drawer />
			
			<Search />
			{token?<DropdownMenu />:
			<>
				<Button variant="contained" onClick={handleClickOpen}>Login</Button>
				<SignupModal />
				<LoginModal />
			</>
			}
		</Toolbar>
	</AppBar>
	<Toolbar />
	</React.Fragment>
	)
}

export default Header
