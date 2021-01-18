import axios from 'axios'
import { DOMAIN } from '../../settings'
import { ADD_TO_CART, ADD_TO_WISHLIST, CHANGE_PRODUCT_COMMENT, CHANGE_PRODUCT_RATING, CLEAR_PRODUCT, DELETE_REVIEW, EDIT_REVIEW, FETCH_PRODUCT_DETAILS_SUCCESS, SAVE_REVIEW, TOGGLE_PRODUCT_INDIVIDUAL_LOADING } from './types'

const fetchProductDetailsSuccess = (data) => {
    return {
        type: FETCH_PRODUCT_DETAILS_SUCCESS,
        payload: data,
    }
}

const fetchProductDetails = (product_id) => (dispatch) => {
    dispatch({ type: CLEAR_PRODUCT }) //Remove old product info
    dispatch({type: TOGGLE_PRODUCT_INDIVIDUAL_LOADING})
    if(localStorage.getItem('token')){
        axios.get(DOMAIN+"/api/products/"+product_id, { headers: {Authorization: "Token "+localStorage.getItem('token')}})
        .then(res=>{
            dispatch(fetchProductDetailsSuccess(res.data))
            dispatch({type: TOGGLE_PRODUCT_INDIVIDUAL_LOADING})
        })
    }else{
        axios.get(DOMAIN+"/api/products/"+product_id)
        .then(res=>{
            dispatch(fetchProductDetailsSuccess(res.data))
            dispatch({type: TOGGLE_PRODUCT_INDIVIDUAL_LOADING})
        })
    }
}

export { fetchProductDetails }

const changeProductRating = (newRating) => {
    return {
        type: CHANGE_PRODUCT_RATING,
        payload: newRating
    }
}
const changeProductComment = (newComment) => {
    return {
        type: CHANGE_PRODUCT_COMMENT,
        payload: newComment
    }
}

const saveReview = (product_id, comment, rating) => (dispatch) => {
    dispatch({type: SAVE_REVIEW, payload: localStorage.getItem('name')})
    axios.post(DOMAIN+"/api/reviews/"+product_id, {
        comment: comment,
        rating: rating,
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
}
const editReview = () => {
    return {
        type: EDIT_REVIEW
    }
}
const deleteReview = (product_id) => (dispatch) => {
    dispatch({type: DELETE_REVIEW})
    axios.delete(DOMAIN+"/api/reviews/"+product_id, { headers: {Authorization: "Token "+localStorage.getItem('token')}})
}
export { changeProductRating, changeProductComment, saveReview, editReview, deleteReview }

const addToCart = (product_id, quantity) => (dispatch) => {
    dispatch({type: ADD_TO_CART})
    axios.post(`${DOMAIN}/api/cart/`, {
        product_id: product_id,
        quantity: quantity
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
}
const addToWishlist = (product_id) => (dispatch) => {
    dispatch({type: ADD_TO_WISHLIST})
    axios.post(`${DOMAIN}/api/wishlist/`, {
        product_id: product_id
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
}
export {addToCart, addToWishlist}