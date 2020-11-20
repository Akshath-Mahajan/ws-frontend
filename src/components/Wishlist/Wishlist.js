import React, {useEffect} from 'react'
import { fetchWishlistItems } from '../../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import WishlistItem from './WishlistItem'

// const useStyles = makeStyles(theme=>({
//     mar: {marginTop: theme.spacing(2)},
//     pad: { padding : theme.spacing(2) },
//     fitWidth: {width: 'fit-content'},
//     fillWidth: {width: '100%'}
// })
// )

function Wishlist() { 
    const dispatch = useDispatch()
    useEffect(()=>dispatch(fetchWishlistItems()), [])
    // const classes = useStyles()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {defaultMatches: true});
    const data = useSelector(state=>state.wishlist.wishlist)
    return (
        <Grid container justify="center" spacing={isMobile?0:2}>
            {   Object.keys(data).length !==0?
                Object.keys(data).map((key)=><WishlistItem key={key} data={data[key]}/>): 
                <Grid item>
                    <Typography variant="h3">
                        Your wishlist is empty!
                    </Typography>
                </Grid>
            }
        </Grid>
    )
}

export default Wishlist
