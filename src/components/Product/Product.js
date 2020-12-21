import { Button, Grid, Typography, Paper, makeStyles, Box, IconButton, TextField, InputAdornment } from '@material-ui/core'
import Axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from '../../settings'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { changeProductComment, changeProductRating, deleteReview, editReview, fetchProductDetails, saveReview, addToCart } from '../../redux';
import Slider from "react-slick"

const useStyles = makeStyles((theme)=>({
    container: {padding: theme.spacing(2)},
    outlinedPaper: {padding:theme.spacing(2), marginBottom:theme.spacing(2)},
    fullWidth: {width: '100%'},
    fR: {float: 'right'},
    padY: {paddingBottom: theme.spacing(2), paddingTop: theme.spacing(2)},
    padB: {paddingBottom: theme.spacing(2)},
    padTop: {paddingTop: theme.spacing(4)}
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
    const imgs = useSelector(state=>state.product.images)
    const product = useSelector(state=>state.product.product)
    const settings = {
        arrows: false,
        dots: true,
        autoplay: true,
        infinte: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    }
    return (
        <div style={{width: width}}>
        <Slider {...settings}>
            <div>
                <img alt={product.name} src={DOMAIN+product.image} height="500" />
            </div>
            {
            imgs.map(item =><div><img key={item.id} alt={product.name} src={DOMAIN + item.image} height="500" /> </div>)
            }
        </Slider>
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
    const classes = useStyles()
    return Object.keys(product).length ? (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3} container>
                <Paper className={classes.container} style={{overflow: 'hidden'}}>
                    <Grid item xs={12}>
                        {/* <img alt={product.name} src={DOMAIN + product.image} width="100%" /> */}
                        <ImageSlider  />
                    </Grid>
                    <Grid item xs={12} container className={classes.padTop}>
                        <Grid item xs={12} sm={6}>
                            {
                            inCart?
                            <Button fullWidth color="secondary" size="large" variant="contained" disabled> In Cart </Button>
                            :
                            <Button fullWidth color="secondary" size="large" variant="contained" onClick={()=>{dispatch(addToCart(product.id)) }}>Cart</Button>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button fullWidth color="primary" size="large" variant="contained">Buy</Button>    
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={9} container>
                <Paper className={`${classes.container} ${classes.fullWidth}`}>
                    <Typography variant="h2" gutterBottom>{product.name}</Typography>
                    <Paper variant="outlined" className={classes.outlinedPaper}>
                        <Typography variant="h5"><strong>Price:</strong> ₹{product.price}</Typography>
                    </Paper>
                    <Paper variant="outlined" className={classes.outlinedPaper}>
                        <Typography variant="body1" gutterBottom><strong>Category:</strong> {product.category.name}</Typography>
                        <Typography variant="body1" gutterBottom><strong>Description:</strong> {product.description}</Typography>
                    </Paper>
                    {/* Reviews */}
                    <Box>
                        <Typography variant="h5">Reviews</Typography>
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
