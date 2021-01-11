import { Button, fade, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import LOGO from '../../Icons/main.svg'

const useStyles = makeStyles((theme) => ({
    outerRoot:{ // To push the right icon to right most side
        flexGrow: 1,
        marginRight: theme.spacing(2),
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
    icon:{padding: theme.spacing(1)},
    link: {textDecoration: 'None', color:'initial'},
    mgnR:{marginRight: theme.spacing(3)},
	logo: {height: theme.spacing(5)}
})
);

function Search(props) {
    const classes = useStyles()
    const [q, setQ] = useState(null)
    return (
        <div className={classes.outerRoot}>
            <Link className={classes.link} to = "">
                <img src={LOGO} className={`${classes.mgnR} ${classes.logo}`} alt="React Logo" />
            </Link>
            <TextField  className={classes.root} variant="outlined"
            placeholder="Search.." margin="dense" value={q} onChange={(e) => setQ(e.target.value)}
            InputProps={{
                startAdornment: <InputAdornment position="start"> <SearchIcon /> </InputAdornment>,
                endAdornment: <InputAdornment position="end"> {q?<Link className={classes.link} to={`/search/${q}`}><Button>Go</Button></Link>:<Button>Go</Button>}</InputAdornment>
            }}
        />
        
        </div>
    )
}
export default Search
