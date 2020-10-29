import { fade, InputBase, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React from 'react'

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
    }
})
);

function Search(props) {
    const classes = useStyles()
    return (
        <div className={classes.outerRoot}>
            <div className={classes.root}>
            <SearchIcon className={classes.icon}/>
            <InputBase
            placeholder="Search..."
            className={classes.input}
            />
            </div>
        </div>
    )
}
export default Search
