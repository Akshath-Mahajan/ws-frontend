import { AppBar, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux'
import Drawer from './Drawer';
import Search from './Search';
import DropdownMenu from './DropdownMenu';
import LoginModal from './LoginModal';
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
	const email = useSelector(state => state.user.email)
	return (
	<React.Fragment>
	<AppBar>
		<Toolbar>
			<Drawer />
			<Hidden xsDown>
				<Typography variant="h6" component="div" className={classes.mgnR}>Company Name</Typography>
			</Hidden>
			<Search />
			{email?<DropdownMenu />:<LoginModal />}
		</Toolbar>
	</AppBar>
	<Toolbar />
	</React.Fragment>
	)
}

export default Header
