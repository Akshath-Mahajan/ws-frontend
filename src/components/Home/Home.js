import { Button, Card, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
// import { useSelector } from 'react-redux'
// import { ProductGrid, ProductGridItem } from '../Generic/'
import ProductSlider from '../Generic/ProductSlider'
const useStyles = makeStyles(theme=>({
    cardRoot: {width: '100%'},
    mb: {marginBottom: theme.spacing(5)},
    cardContainer: {display: 'grid'},
    cardMedia: {gridArea: '1/1'},
    cardBtn: {marginTop: 200, marginLeft: 300, height: 80, width: 250}
}))
function Home(props) {
    const classes = useStyles()
    /* GO OVER HOOKS USAGE WARNINGS IN REDUX DOCS, 
    OTHERWISE USE MAPSTATETOPROPS AND MAPDISPATCHTOPROPS WITH CONNECTOR */
    return (
        <div>
            <Card className={`${classes.cardRoot}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="something"
                    height={350}
                    image="https://www.teahub.io/photos/full/7-76929_82-4k-hd-wallpapers-hd-wallpapers-laptop.jpg"
                />
            </Card>
            <Typography variant="h1" align="center" className={classes.mb}>Quotes</Typography>
            <ProductSlider className={classes.mb} data={["hello there", "Heylo", "this is just a test", 'Hello bro', 'mic test', 'all these', 'are gonna be', 'replaced with cards', 'so yeah']} />
            <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    height={350}
                    image="https://www.hdwallpapers.in/download/cars_3_2017_4k_8k-2560x1440.jpg"
                />
                <div className={`${classes.cardMedia}`}>
                    <Button variant="outlined" className={classes.cardBtn}>Order Now</Button>
                </div>
            </Card>
            <ProductSlider className={classes.mb} data={["hello there", "Heylo", "this is just a test", 'Hello bro', 'mic test', 'all these', 'are gonna be', 'replaced with cards', 'so yeah']} />
            <Typography variant="h1" align="center">Discover You</Typography>
            <ProductSlider className={classes.mb} data={["hello there", "Heylo", "this is just a test", 'Hello bro', 'mic test', 'all these', 'are gonna be', 'replaced with cards', 'so yeah']} />
            <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    height={350}
                    image="https://www.hdwallpapers.in/download/cars_3_2017_4k_8k-2560x1440.jpg"
                />
                <div className={`${classes.cardMedia}`}>
                    <Typography variant="h3">This should be swipable, swipe to open full collection</Typography>
                    <Button variant="outlined" className={classes.cardBtn}>Order Now</Button>
                </div>
            </Card>
        </div>
    )
}
export default Home