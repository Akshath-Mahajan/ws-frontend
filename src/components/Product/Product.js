import { Button, Grid, Typography, Paper, makeStyles, Box, IconButton, TextField, InputAdornment } from '@material-ui/core'
import Axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DOMAIN } from '../../settings'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme)=>({
    container: {padding: theme.spacing(2)},
    outlinedPaper: {padding:theme.spacing(2), marginBottom:theme.spacing(2)},
    fullWidth: {width: '100%'},
    fR: {float: 'right'},
    padY: {paddingBottom: theme.spacing(2), paddingTop: theme.spacing(2)},
    padB: {paddingBottom: theme.spacing(2)}
}))
function Review({item, editable}){
    const classes = useStyles()
    return (
    <Paper variant="outlined" className={classes.outlinedPaper}> 
        {editable? <span className={classes.fR}><IconButton> <EditIcon /> </IconButton> <IconButton><DeleteIcon/></IconButton></span>: ""}
        <Typography><strong>User: </strong>{item.user}</Typography>
        {item.comment? <Typography variant="body1"><strong>Comment: </strong> {item.comment} </Typography>: "" }
        
        <Rating value={item.rating/20} readOnly precision={0.1} />
    </Paper>
    )
}
function AddReview(){
    const classes = useStyles()
    return (
    <Paper variant="outlined" className={classes.outlinedPaper}>
        <Typography gutterBottom><strong>Add Review</strong></Typography>
        <Rating precision={0.5} className={classes.padY} />
        <TextField fullWidth type="text" placeholder="Comment..." variant="filled" className={classes.padB} />
        <Button variant="outlined">Save</Button>
    </Paper>
    )
}
function Product() {
    const {id} = useParams()
    const [data, setData] = React.useState(null)
    useEffect(()=> {
        if(localStorage.getItem('token'))
        Axios.get(DOMAIN+"/api/products/"+id, { headers: {Authorization: "Token "+localStorage.getItem('token')}}).then(
        res=> {setData(res.data)})
        else
        Axios.get(DOMAIN+"/api/products/"+id).then(
            res=> {setData(res.data)})
    }, [])
    const classes = useStyles()
    if(data)
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3} container>
                    <Paper className={classes.container}>
                        <Grid item xs={12}>
                            <img alt={data.product.name} src={DOMAIN+ data.product.image} width="100%" />
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth color="secondary" size="large" variant="contained">Cart</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button fullWidth color="primary" size="large" variant="contained">Buy</Button>    
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={9} container>
                    <Paper className={`${classes.container} ${classes.fullWidth}`}>
                        <Typography variant="h2" gutterBottom>{data.product.name}</Typography>
                        <Paper variant="outlined" className={classes.outlinedPaper}>
                            <Typography variant="h5"><strong>Price:</strong> ₹{data.product.price}</Typography>
                        </Paper>
                        <Paper variant="outlined" className={classes.outlinedPaper}>
                            <Typography variant="body1" gutterBottom><strong>Category:</strong> {data.product.category.name}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Description:</strong> {data.product.description}</Typography>
                        </Paper>
                        {/* Reviews */}
                        <Box>
                            <Typography variant="h5">Reviews</Typography>
                            {data.user_review.id?<Review item={data.user_review} editable />:<AddReview />}
                            {data.reviews.map((item, idx)=>
                                <Review item={item} />
                            )}
                            {/* {id: 1, user: 5, product: 1, rating: 100, comment: ""} */}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    return <div></div>
}

export default Product
