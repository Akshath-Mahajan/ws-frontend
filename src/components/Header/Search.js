import { Button, fade, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    outerRoot:{ // To push the right icon to right most side
        flexGrow: 1,
        marginRight: theme.spacing(2),
    },
    root:{
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius:theme.shape.borderRadius,
        width: 300,
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        },
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    icon:{
        padding: theme.spacing(1)
    },
    input:{
        color:'inherit',
    },
    link: {textDecoration: 'None', color:'initial'}
})
);

function Search(props) {
    const classes = useStyles()
    const [q, setQ] = useState(null)
    return (
        <div className={classes.outerRoot}>
            <TextField className={classes.root} variant="outlined" fullWidth
            placeholder="Search.." margin="dense" value={q} onChange={(e) => setQ(e.target.value)}
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /> </InputAdornment>,
                endAdornment: <InputAdornment position="end"><Link className={classes.link} to={`/search/${q}`}><Button>Go</Button></Link></InputAdornment>
            }}
        />
        
        </div>
    )
}
export default Search
