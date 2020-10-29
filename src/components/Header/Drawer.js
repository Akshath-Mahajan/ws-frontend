import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from '@material-ui/core'
import React, { useState } from 'react'
import AppleIcon from '@material-ui/icons/Apple';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
const useStyles = makeStyles((theme)=>({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
		...theme.mixins.toolbar,
		paddingRight:0,
        justifyContent: 'flex-end',
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	widthAdjust: {
		[theme.breakpoints.down('xs')]: {
			width: '100vw',
		},
	}
}))
function Drawer(props) {
	const options = ['All mail', 'Trash', 'Spam']
	const icons = [<AppleIcon/>, <AppsIcon/>, <AppleIcon/>]

	const [open, setOpen] = useState(false)
    const toggleDrawer = (status) => setOpen(status) 
    const classes = useStyles()
	const list = (
		<React.Fragment>
		<List onClick={() => toggleDrawer(false)} className={classes.widthAdjust}>
			{options.map((item, index)=>(
			<ListItem button key={index}>
				<ListItemIcon>{icons[index]}</ListItemIcon>
				<ListItemText primary={item} />
			</ListItem>
				))}
		</List>
		<Divider />
		<List onClick={() => toggleDrawer(false)} style={{width:250}}>
			{options.map((item, index)=>(
			<ListItem button key={index}>
				<ListItemIcon>{icons[index]}</ListItemIcon>
				<ListItemText primary={item} />
			</ListItem>
				))}
		</List>
		</React.Fragment>
	)

	return (
		<div>
			<IconButton className={classes.menuButton} size="medium" onClick={() => toggleDrawer(true)}><MenuIcon/></IconButton>
			<SwipeableDrawer
			anchor="left"
			open={open}
			onClose={() => toggleDrawer(false)}
			onOpen={() => toggleDrawer(true)}
			>
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => toggleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
				{list}
			</SwipeableDrawer>
		</div>
	)
}

export default Drawer
