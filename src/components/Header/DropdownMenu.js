import { Button, MenuItem, Avatar, ClickAwayListener, Paper, Grow, Popper, MenuList, makeStyles, Badge, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux';
import { Link } from 'react-router-dom';
import HeartLogo from '../../Icons/Heart.svg'
import AccountLogo from '../../Icons/Account.svg'
import CartLogo from '../../Icons/Cart.svg'

const useStyles = makeStyles((theme) => ({
    listWidth: {
        width: 200,
        [theme.breakpoints.down('xs')]:{
            width:150
        }
    },
    listIcon: {marginRight: theme.spacing(1), height: theme.spacing(4), width: theme.spacing(4), color: 'black'},
    flexGrow: {flexGrow:1},
    linkText: {color: 'inherit', textDecoration:'None'}
})
)
function Dropdown() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const handleToggle = () => {setOpen((prevOpen) => !prevOpen);};
    const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {return;}
        setOpen(false);
    };
    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {anchorRef.current.focus();}
        prevOpen.current = open;
    }, [open]);

    const numOfItemsInCart = useSelector(state => state.cart.num)
    const numOfItemsInWishlist = useSelector(state => state.wishlist.num)
    const dispatch = useDispatch()
    return (
        <div>
            <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            >
                <Avatar>
                    <AccountCircleIcon/>
                </Avatar>
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.listWidth}>
                            <Link to="/profile/" className={classes.linkText}>
                            <MenuItem onClick={handleClose}>
                                <img src={AccountLogo} className={classes.listIcon} alt="React Logo" />
                                <Typography className={classes.flexGrow}> My account </Typography>
                            </MenuItem>
                            </Link>
                            <Link to="/wishlist/" className={classes.linkText}>
                            <MenuItem onClick={handleClose}>
                                <img src={HeartLogo} className={classes.listIcon} alt="React Logo" />
                                {/* < className={classes.listIcon} /> */}
                                <Typography className={classes.flexGrow}> Wishlist </Typography>
                                <Badge color="secondary" badgeContent={numOfItemsInWishlist}/>
                            </MenuItem>
                            </Link>
                            <Link to="/cart/" className={classes.linkText}>
                            <MenuItem onClick={handleClose}>
                                <img src={CartLogo} className={classes.listIcon} alt="React Logo" />
                                <Typography className={classes.flexGrow}> Cart </Typography>
                                <Badge color="secondary" badgeContent={numOfItemsInCart }/>
                            </MenuItem>
                            </Link>
                            <MenuItem onClick={(e) => {handleClose(e); dispatch(logout())}}>
                                <PowerSettingsNewIcon className={classes.listIcon} />
                                <Typography className={classes.flexGrow}> Logout </Typography>
                            </MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default Dropdown
