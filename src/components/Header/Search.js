import { Button, fade, InputAdornment, makeStyles, TextField, useMediaQuery, useTheme, IconButton, Collapse, Popover } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import LOGO from '../../Icons/main.svg'

const useStyles = makeStyles((theme) => ({
    outerRoot:{ // To push the right icon to right most side
        flexGrow: 1,
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]:{marginRight:0},
        display: 'flex',
        alignItems: 'center',
    },
    root:{
        borderRadius:theme.shape.borderRadius,
        width: '50%',
        [theme.breakpoints.down('xs')]:{width:'100%'},
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            borderColor: 'transparent',
        },
    },
    pr0: {paddingRight: 0}, adornment: {width: '10%'},
    icon:{padding: theme.spacing(1)},
    link: {textDecoration: 'None', color:'initial'},
    mgnR:{marginRight: theme.spacing(3)},
	logo: {height: theme.spacing(5)}
})
);

function Search(props) {
    const classes = useStyles()
    const [q, setQ] = useState(null)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {defaultMatches: true});
    const [searchOpen, setSearchOpen] = useState(!isMobile)

    if(isMobile){
        return (
            <div className={classes.outerRoot}>
                {
                !searchOpen?
                <>
                    <Link className={classes.link} to = "">
                        <img src={LOGO} className={`${classes.mgnR} ${classes.logo}`} alt="React Logo" />
                    </Link>
                    <IconButton onClick = {() => setSearchOpen(!searchOpen)}>
                        <SearchIcon />
                    </IconButton>
                </>
                :
                    ""
                }
                {
                searchOpen?
                    <TextField  variant="outlined" className={classes.root} style={{width: '100%'}}
                    placeholder="Search.." margin="dense" value={q} onChange={(e) => setQ(e.target.value)}
                    InputProps={{
                        className:classes.pr0,
                        startAdornment: <InputAdornment position="start"  onClick = {() => setSearchOpen(!searchOpen)}> <SearchIcon /> </InputAdornment>,
                        endAdornment: <InputAdornment position="end" > {
                                        q?<Link className={classes.link} to={`/search/${q}`}>
                                            <Button style={{paddingLeft:0, paddingRight: 0}}>Go</Button>
                                        </Link>
                                        :
                                        <Button style={{paddingLeft:0, paddingRight: 0}}>Go</Button>
                                        }
                                    </InputAdornment>
                        }}
                    />
                :
                    ""
                }
            </div>
        )
    }
    return (
        <div className={classes.outerRoot}>
            <Link className={classes.link} to = "">
                <img src={LOGO} className={`${classes.mgnR} ${classes.logo}`} alt="Logo" />
            </Link>
            <TextField  className={classes.root} variant="outlined"
            placeholder="Search.." margin="dense" value={q} onChange={(e) => setQ(e.target.value)}
            InputProps={{
                className:classes.pr0,
                startAdornment: <InputAdornment position="start"> <SearchIcon /> </InputAdornment>,
                endAdornment: <InputAdornment position="end" > {
                                    q?<Link className={classes.link} to={`/search/${q}`}>
                                        <Button style={{paddingLeft:0, paddingRight: 0}}>Go</Button>
                                    </Link>
                                    :
                                    <Button style={{paddingLeft:0, paddingRight: 0}}>Go</Button>
                                    }
                                </InputAdornment>
                }}
            />
        
        </div>
    )
}
export default Search
