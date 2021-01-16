import { Button, Card, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHome } from '../../redux'
// import { useSelector } from 'react-redux'
// import { ProductGrid, ProductGridItem } from '../Generic/'

import ProductSlider from '../Generic/ProductSlider'
import Footer from '../Header/Footer'
const useStyles = makeStyles(theme=>({
    mb: {marginBottom: theme.spacing(5)},
    m: {marginBottom: theme.spacing(5), marginTop: theme.spacing(5)},
    cardRoot: { position: 'relative', width: '100%' },
    cardContainer: { display: 'grid' },
    cardMedia: { gridArea: '1/1' },
    cardBtn: {marginTop: 390, marginLeft: '55vw', height: 80, width: '20vw'},
    
    overlay: {
        position: 'absolute',
        top: '1px',
        left: '1px',
        right: '1px',
        bottom: '1px',
        color: '#F8F8FF',
    },
    dark : {backgroundColor: 'rgba(0,0,0,0.35)',},
    light : {backgroundColor: 'rgba(0,0,0,0.15)',}
}))
function Home(props) {
    const classes = useStyles()
    /* GO OVER HOOKS USAGE WARNINGS IN REDUX DOCS, 
    OTHERWISE USE MAPSTATETOPROPS AND MAPDISPATCHTOPROPS WITH CONNECTOR */
    const dispatch = useDispatch()
    useEffect(()=>{dispatch(fetchHome())}, [])
    const trending_products = useSelector(state=>state.home.trending)
    const new_products = useSelector(state=>state.home.new)

    return (
        <div>
            <Card className={`${classes.cardRoot}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="something"
                    style={{height: '75vh'}}
                    image="https://i.pinimg.com/originals/ee/81/99/ee819909e5ca2476ef0cfcc626f4ead7.jpg"
                />
                <div className={`${classes.overlay} ${classes.dark}`}>
                    <Typography variant="h1" align="center" className={classes.mb}>Video</Typography>
                </div>
            </Card>
            <Typography variant="h3" align="center" className={classes.m}>Quotes</Typography>
            <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    style={{height: '75vh'}}
                    image="https://www.itl.cat/pngfile/big/210-2102958_dark-desk-laptop-macbook-room-table-technology-desk.jpg"
                />
                <div className={`${classes.overlay} ${classes.light}`}>
                    <Typography variant="h2" style={{position:'absolute', right: 50, top: 40}}>Quote</Typography>
                    <Button variant="outlined" color="inherit"  className={classes.cardBtn}>Order Now</Button>
                </div>
            </Card>
            <ProductSlider className={classes.mb} data={trending_products}/>
            <div>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Typography variant="h2">
                        DIS
                    </Typography>
                    <Typography variant="h2">
                        COV
                    </Typography>
                    <Typography variant="h2">
                        ER
                    </Typography>
                </div>
                <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <Typography variant="h2" align="left">
                        Y
                    </Typography>
                    <Typography variant="h2" align="center">
                        O
                    </Typography>
                    <Typography variant="h2" align="right">
                        U
                    </Typography>
                </div>
            </div>
            <ProductSlider className={classes.mb} data={new_products}/>
            <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    style={{height: '75vh'}}
                    image="https://www.itl.cat/pngfile/big/210-2102958_dark-desk-laptop-macbook-room-table-technology-desk.jpg"
                />
                <div className={`${classes.overlay} ${classes.light}`}>
                    <Typography variant="h3">This should be swipable, swipe to open full collection</Typography>
                    <Button variant="outlined" color="inherit" className={classes.cardBtn}>Order Now</Button>
                </div>
            </Card>
            
            <Footer />
        </div>
    )
}
export default Home