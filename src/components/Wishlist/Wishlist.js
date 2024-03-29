import React, {useEffect} from 'react'
import { fetchWishlistItems } from '../../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Grid, ThemeProvider, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import WishlistItem from './WishlistItem'
import { headingFont } from '../../baseTheme'
import LoadingBackdrop from '../Generic/LoadingBackdrop'
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
    const loading = useSelector(state=>state.wishlist.loading)
    if(loading)
        return <LoadingBackdrop open/>

    return (
        <Grid container justify="space-around" spacing={1}>
            {   Object.keys(data).length !==0?
                Object.keys(data).map((key)=><WishlistItem key={key} data={data[key].product} inCart={data[key].in_cart}/>): 
                <Grid item>
                <ThemeProvider theme={headingFont}>
                    <Typography variant="h3">
                        Your wishlist is empty!
                    </Typography>
                </ThemeProvider>
                </Grid>
            }
        </Grid>
    )
}

export default Wishlist
