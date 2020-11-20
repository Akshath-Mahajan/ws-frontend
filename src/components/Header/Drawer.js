import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, SwipeableDrawer } from '@material-ui/core'
import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InfoIcon from '@material-ui/icons/Info';
import CollectionsIcon from '@material-ui/icons/Collections';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
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
		width:250,
		[theme.breakpoints.down('xs')]: {
			width: '100vw',
		},
	}
}))
function Drawer(props) {
	const options = [
		['Home', <HomeIcon />],
		['Newly Released', <NewReleasesIcon />],
		['Collection', <CollectionsIcon />], 
		['Trending', <WhatshotIcon />],
		['Contact Us', <AlternateEmailIcon />], 
		['About us', <InfoIcon />],
	]
	const [open, setOpen] = useState(false)
	const toggleDrawer = (status) => setOpen(status)
    const classes = useStyles()

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
			<List onClick={() => toggleDrawer(false)} className={classes.widthAdjust}>
			{
				options.map((item, index)=>(
				<ListItem button key={index}>
					<ListItemIcon>{item[1]}</ListItemIcon>
					<ListItemText primary={item[0]} />
				</ListItem>
				))
			}
			</List>
			<Divider />
			</SwipeableDrawer>
		</div>
	)
}

export default Drawer
