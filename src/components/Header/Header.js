import { AppBar, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import Drawer from './Drawer';
import Search from './Search';
import Menu from './Dropdown';
const useStyles = makeStyles((theme) => ({
	mgnR:{
		marginRight: theme.spacing(3)
	},
})
)
function Header(props) {
	const classes=useStyles()
	return (
	<React.Fragment>
	<AppBar>
		<Toolbar>
			<Drawer />
			<Hidden xsDown>
				<Typography variant="h6" className={classes.mgnR}>Company Name</Typography>
			</Hidden>
			<Search />
			<Menu />
		</Toolbar>
	</AppBar>
	<Toolbar />
	</React.Fragment>
	)
}

export default Header
