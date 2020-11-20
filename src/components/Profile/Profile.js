import { Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ShopIcon from '@material-ui/icons/Shop';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HelpIcon from '@material-ui/icons/Help';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: `calc(100vh - 82px)`,
		backgroundColor: theme.palette.background.default,
		display: 'flex',
	},
	padTop: {paddingTop: theme.spacing(2)},
}));

function Profile() {
	const classes = useStyles();
	return (
	<div className={classes.root}>
		<Grid container justify="center" spacing={2}>
			<Grid item xs={12} sm={5} md={4} lg={3} className={classes.listGrid}>
				<List className={classes.padTop}>
					<Paper>
					<ListItem button>
						<ListItemIcon>
							<ShopIcon color="primary" />
						</ListItemIcon>
						<Typography variant="h6">My Orders</Typography>
					</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="All Orders" />
						</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Live Orders" />
						</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Delivered Orders" />
						</ListItem>

					<ListItem button>
						<ListItemIcon>
							<PersonIcon color="primary" />
						</ListItemIcon>
						<Typography variant="h6">Account Settings</Typography>
					</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Profile Information" />
						</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Delivery Address" />
						</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Password Reset" />
						</ListItem>
					<ListItem button>
						<ListItemIcon>
							<CreditCardIcon color="primary" />
						</ListItemIcon>
						<Typography variant="h6">Payments</Typography>
					</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="All Transactions" />
						</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Payments Made" />
						</ListItem>
						<ListItem button>
							<ListItemIcon />
							<ListItemText primaryTypographyProps={{variant:'button'}} primary="Refunds" />
						</ListItem>
					<ListItem button>
						<ListItemIcon>
							<HelpIcon color="primary" />
						</ListItemIcon>
						<Typography variant="h6">Help</Typography>
					</ListItem>
					</Paper>
				</List>
			</Grid>
			<Grid item xs={12} sm={7} md={6} lg={7}>
				<div className={classes.padTop}>
				<Paper>
					Test
				</Paper>
				</div>
			</Grid>
		</Grid>
	</div>
	)
}

export default Profile
