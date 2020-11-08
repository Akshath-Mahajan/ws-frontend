import React, {useEffect} from 'react'
import { fetchWishlistItems } from '../../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Grid, makeStyles } from '@material-ui/core'
import WishlistItem from './WishlistItem'
const useStyles = makeStyles(theme=>({
    mar: {marginTop: theme.spacing(2)},
    pad: { padding : theme.spacing(2) },
    fitWidth: {width: 'fit-content'},
    fillWidth: {width: '100%'}
})
)

function Wishlist() { 
    const classes = useStyles()
    const dispatch = useDispatch()
    const data = useSelector(state=>state.wishlist.wishlist)
    useEffect(()=>dispatch(fetchWishlistItems()), [])
    return (
        <Grid item container xs={12} spacing={2}>
            {data.map(item=><WishlistItem key={item.id} data={item}/>)}
        </Grid>
    )
}

export default Wishlist
