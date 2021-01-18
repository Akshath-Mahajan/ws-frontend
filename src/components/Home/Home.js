import { Button, Card, CardMedia, makeStyles, ThemeProvider, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHome } from '../../redux'
// import { useSelector } from 'react-redux'
// import { ProductGrid, ProductGridItem } from '../Generic/'
import { headingFont } from '../../baseTheme'
import ProductSlider from '../Generic/ProductSlider'
import Footer from '../Header/Footer'
import { home_quotes, YT_VIDEO_CODE, home_img1_quote, home_img2_quote, home_img1_url, home_img2_url, home_img1_btn_redirect, home_img2_btn_redirect} from '../../settings'
import { useHistory } from 'react-router-dom'
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
    let history = useHistory()
    return (
        <div>
            <Card className={`${classes.cardRoot}`}>
                <CardMedia className={classes.cardMedia}
                    component="iframe"
                    alt="video"
                    style={{height: '75vh'}}
                    src={`https://www.youtube.com/embed/${YT_VIDEO_CODE}`}      
                />
            </Card>
            <ThemeProvider theme={headingFont}>
                {
                    home_quotes.map(item=>(
                        <Typography variant="h3" align="center" className={classes.m}>{item}</Typography>
                    )
                )
                }
                
            </ThemeProvider>
            <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    style={{height: '75vh'}}
                    image={home_img1_url}
                />
                <div className={`${classes.overlay} ${classes.light}`}>
                <ThemeProvider theme={headingFont}>  
                    <Typography variant="h2" style={{position:'absolute', right: 50, top: 40}}>{home_img1_quote}</Typography>
                    <Button variant="outlined" color="inherit"  className={classes.cardBtn} onClick={()=>{history.push(home_img1_btn_redirect)}}>
                        Order Now
                    </Button>
                </ThemeProvider>  
                </div>
            </Card>
            <ProductSlider className={classes.mb} data={trending_products}/>
            <div>
            <ThemeProvider theme={headingFont}>
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
            </ThemeProvider>
            </div>
            <ProductSlider className={classes.mb} data={new_products}/>
            <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                <CardMedia className={classes.cardMedia}
                    component="img"
                    alt="collection image"
                    style={{height: '75vh'}}
                    image={home_img2_url}
                />
                <div className={`${classes.overlay} ${classes.light}`}>
                <ThemeProvider theme={headingFont}>  
                    <Typography variant="h3">{home_img2_quote}</Typography>
                    <Button variant="outlined" color="inherit" className={classes.cardBtn} onClick={()=>{history.push(home_img2_btn_redirect)}}>Order Now</Button>
                </ThemeProvider>
                </div>
            </Card>
            
            <Footer />
        </div>
    )
}
export default Home