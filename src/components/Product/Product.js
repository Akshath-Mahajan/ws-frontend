import { Button, Grid, Typography, Paper, makeStyles, Box, IconButton, TextField, InputAdornment, OutlinedInput, ThemeProvider } from '@material-ui/core'
import Axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from '../../settings'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { changeProductComment, changeProductRating, deleteReview, editReview, fetchProductDetails, saveReview, addToCart, addToWishlist, openAddress, closeModals, openPayments } from '../../redux';
import Slider from "react-slick"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import '../../App.css'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import PaymentModal from '../PaymentModal/PaymentModal';
import { headingFont } from '../../baseTheme';
const useStyles = makeStyles((theme)=>({
    container: {padding: theme.spacing(2)},
    outlinedPaper: {padding:theme.spacing(2), marginBottom:theme.spacing(2)},
    fullWidth: {width: '100%'},
    fR: {float: 'right'},
    padY: {paddingBottom: theme.spacing(2), paddingTop: theme.spacing(2)},
    padB: {paddingBottom: theme.spacing(2)},
    padTop: {paddingTop: theme.spacing(2)},
    m1: {margin: theme.spacing(1)},
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100vh',
    },
}))
function Review({item, editable}){
    const classes = useStyles()
    const dispatch = useDispatch()
    const productId = useSelector(state=>state.product.product.id)
    return (
    <Paper variant="outlined" className={classes.outlinedPaper}> 
        {editable? <span className={classes.fR}><IconButton onClick={()=>dispatch(editReview())}> <EditIcon /> </IconButton> <IconButton onClick={()=>dispatch(deleteReview(productId))}><DeleteIcon/></IconButton></span>: ""}
        <Typography><strong>User: </strong>{item.user}</Typography>
        {item.comment? <Typography variant="body1"><strong>Comment: </strong> {item.comment} </Typography>: "" }
        
        <Rating value={item.rating/20} readOnly precision={0.1} />
    </Paper>
    )
}
function AddReview({ editing }){
    const classes = useStyles()
    const dispatch = useDispatch()
    const userReview = useSelector(state=>state.product.userReview)
    const productId = useSelector(state=>state.product.product.id)
    const token=useSelector(state=>state.user.token)
    if(!token){return null}
    if(!editing && !userReview){return null}
    if(!editing && userReview){ return <Review editable item={userReview} /> }
    const handleChangeRating = (event, newValue) => { dispatch(changeProductRating(newValue*20)) }
    const handleChangeComment = (event) => { dispatch(changeProductComment(event.target.value)) }
    const saveChanges = () => {dispatch(saveReview(productId, userReview.comment, userReview.rating))}
    return (
    <Paper variant="outlined" className={classes.outlinedPaper}>
        <Typography gutterBottom><strong>Add Review</strong></Typography>
        <Rating precision={0.5} 
        className={classes.padY} 
        value={userReview.rating / 20} 
        onChange={handleChangeRating} />
        <TextField fullWidth type="text" placeholder="Comment..." variant="filled" className={classes.padB} value={userReview.comment} onChange={handleChangeComment} />
        <Button variant="outlined" onClick={saveChanges}>Save</Button>
    </Paper>
    )
}
function ImageSlider({width}) {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0)
    const imgs = useSelector(state=>state.product.images)
    const product = useSelector(state=>state.product.product)
    const [sliderRef, slider] = useKeenSlider({
        initial: 0,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
        },
    })
    if(imgs)
        return (
            <>
            <div ref={sliderRef} className={`keen-slider`}>
                <div className={`keen-slider__slide ${classes.item}`}>
                    <img alt={product.name} src={DOMAIN+product.image} height="500" />
                </div>
                {
                imgs.map(item =>(
                    <div className={`keen-slider__slide ${classes.item}`}>
                        <img key={item.id} alt={product.name} src={DOMAIN + item.image} height="500" /> 
                    </div>
                    )
                )
                }
            </div>
            {slider && (
                <div className="dots">
                    {[...Array(slider.details().size).keys()].map((idx) => {
                    return (
                        <button
                        key={idx}
                        onClick={() => {
                            slider.moveToSlideRelative(idx)
                        }}
                        className={"dot" + (currentSlide === idx ? " active" : "")}
                        />
                    )
                    })}
                </div>
            )}
            </>
        )
    return (
        <div>
            <img alt={product.name} src={DOMAIN+product.image} height="500" />
        </div>
    )
}

function Product() {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(()=> { dispatch(fetchProductDetails(id)) }, [])
    const product = useSelector(state=>state.product.product)
    const reviews = useSelector(state=>state.product.reviews)
    const editingReview = useSelector(state=>state.product.editingReview)
    const inCart = useSelector(state=>state.product.inCart)
    const inWishlist = useSelector(state=>state.product.inWishlist)
    const classes = useStyles()
    const [quantity, setQuantity] = useState(1)
    const handleIncrement = () => {setQuantity(quantity+1)}
    const handleDecrement = () => {if(quantity-1 > 0){setQuantity(quantity-1)}}
    const [open, setOpen] = useState(false)
    
    return Object.keys(product).length ? (
        <Grid container>
            <Grid item xs={12} sm={6} md={5} lg={3} container>
                <Paper className={`${classes.container} ${classes.fullWidth} ${classes.m1}`} style={{overflow: 'hidden'}}>
                    <Grid item xs={12}>
                        {/* <img alt={product.name} src={DOMAIN + product.image} width="100%" /> */}
                        <ImageSlider  />
                    </Grid>
                    <Grid item container xs={12} className={classes.padTop}>
                        <Grid container item xs={12}>
                            <Grid item xs={3} container alignItems="center" justify="center">
                                <Grid item>
                                    <IconButton onClick={handleDecrement}>
                                        <RemoveIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container alignItems="center" justify="center">
                                <Grid item>
                                    <TextField 
                                        variant="outlined" type="text" 
                                        inputProps={{style:{textAlign:'center'}}}
                                        margin="dense" fullWidth
                                        value={quantity} readOnly
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs={3} alignItems="center" justify="center">
                                <Grid item>
                                    <IconButton onClick={handleIncrement}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} className={classes.padTop}>
                        <Grid item xs={12}>
                            <Button fullWidth color="primary" size="large" variant="contained" onClick = {() => setOpen(true)}>Buy Now</Button>
                            {open?<PaymentModal buyNow open handleClose={()=>setOpen(false)} product_id={id} quantity={quantity}/>:""}

                        </Grid>
                    </Grid>
                    <Grid item xs={12} container className={classes.padTop}>
                        <Grid item xs={12} sm={6}>
                            {
                            inCart?
                            <Button fullWidth color="secondary" size="large" variant="contained" disabled> In Bag </Button>
                            :
                            <Button fullWidth color="secondary" size="large" variant="contained" onClick={()=>{dispatch(addToCart(product.id, quantity)) }}>Add to bag</Button>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {
                            inWishlist?
                            <Button fullWidth color="primary" size="large" variant="contained" disabled> In Wishlist </Button>
                            :
                            <Button fullWidth color="primary" size="large" variant="contained" onClick={()=>{dispatch(addToWishlist(product.id)) }}>Add to Wishlist</Button>
                            }
                                
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={7} lg={9} container>
                <Paper className={`${classes.container} ${classes.fullWidth} ${classes.m1}`}>
                    <ThemeProvider theme={headingFont}>
                        <Typography variant="h2" gutterBottom>{product.name}</Typography>
                    </ThemeProvider>
                    <Paper variant="outlined" className={classes.outlinedPaper}>
                        <Typography variant="h5" style={{marginBottom: 24}}><strong>Price:</strong>&nbsp; 
                        {product.discount!==0? <Typography style={{display: 'inline', textDecoration:'line-through'}}>
                                                ₹ {product.price}
                                            </Typography>
                        :""}
                        &nbsp;₹{product.price * (100-product.discount) * 0.01} per item
                        </Typography>
                        <Typography variant="body1" gutterBottom><strong>Category:</strong> {product.category.name}</Typography>
                        <Typography variant="body1" gutterBottom><strong>Description:</strong> {product.description}</Typography>
                    </Paper>
                    {/* Reviews */}
                    <Box>
                        <ThemeProvider theme={headingFont}>
                            <Typography variant="h5">Reviews</Typography>
                        </ThemeProvider>
                        <AddReview editing={editingReview} />
                        { reviews.map((item, idx)=><Review key={idx} item={item} />) }
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
    :
    null //Loading...
}

export default Product
