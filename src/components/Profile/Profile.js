import { Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ShopIcon from '@material-ui/icons/Shop';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HelpIcon from '@material-ui/icons/Help';
import ProfileInfo from './ProfileInfo'
import DeliveryAddress from './DeliveryAddress'
import { useSelector, useDispatch } from 'react-redux'
import { changePane } from '../../redux'
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: `calc(100vh - 82px)`,
		backgroundColor: theme.palette.background.default,
		display: 'flex',
	},
	padTop: {paddingTop: theme.spacing(2)},
	pad: {padding:theme.spacing(4)},
}));

function Profile() {
	const classes = useStyles();
	const settings = [
		['Account Settings', -1, <PersonIcon color="primary" />],
		['Profile Information', 0, null],
		['Delivery Address', 1, null],
		['Password Reset', 2, null],
		['My Orders', -1, <ShopIcon color="primary" /> ],
		['All Orders', 3, null],
		['Live Orders', 4, null],
		['Delivered Orders', 5, null],
		['Payments', -1, <CreditCardIcon color="primary" />],
		['All Transactions', 6, null],
		['Payments Made', 7, null],
		['Refunds', 8, null],
		['Help', -1, <HelpIcon color="primary" />],
	]
	const panes = {
		0: <ProfileInfo />,
		1: <DeliveryAddress />,
		2: <ProfileInfo />,
		3: <ProfileInfo />,
		4: <ProfileInfo />,
		5: <ProfileInfo />,
		6: <ProfileInfo />,
		7: <ProfileInfo />,
		8: <ProfileInfo />,
	}
	const activeIdx = useSelector(state=>state.profile.pane)
	const dispatch = useDispatch()
	return (
	<div className={classes.root}>
		<Grid container justify="center" spacing={2}>
			<Grid item xs={12} sm={5} md={4} lg={3} className={classes.listGrid}>
				<List className={classes.padTop}>
					<Paper>
					{
						settings.map((item, idx)=>(
							<ListItem key={idx} disableTouchRipple={item[2]?true:false} button
							onClick={() => {if(!item[2]){ dispatch(changePane(item[1])) } }}
							>
								<ListItemIcon>{item[2]}</ListItemIcon>
								{
								item[2]?
								<Typography variant="h6">{item[0]}</Typography>:
								<ListItemText primaryTypographyProps={{variant:'button'}} primary={item[0]} />
								}

							</ListItem>
						))
					}
					</Paper>
				</List>
			</Grid>
			<Grid item xs={12} sm={7} md={6} lg={7}>
				<div className={classes.padTop}>
				<Paper className={classes.pad}>
					{panes[activeIdx]}
				</Paper>
				</div>
			</Grid>
		</Grid>
	</div>
	)
}

export default Profile
