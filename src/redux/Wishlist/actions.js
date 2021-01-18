import axios from 'axios'
import { FETCH_WISHLIST_SUCCESS, ADD_CART_DELETE_WISHLIST_SUCCESS, DELETE_WISHLIST_SUCCESS, TOGGLE_WISHLIST_LOADING } from './types'
import { DOMAIN } from '../../settings'
const fetchWishlistItemsSuccess = (data) => {
    const obj = {}
    for(let i = 0; i < data.length; i++){obj[data[i].product.id] = {...data[i]}}
    return {
        type: FETCH_WISHLIST_SUCCESS,
        payload: obj
    }
}

const fetchWishlistItems = () => (dispatch) => {
    dispatch({type: TOGGLE_WISHLIST_LOADING})
    axios.get(`${DOMAIN}/api/wishlist/`, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
            dispatch(fetchWishlistItemsSuccess(res.data))
            dispatch({type: TOGGLE_WISHLIST_LOADING})
        }
    )
    
}

const addToCartdeleteWishlistItemSuccess = (product_id) => {
    return {
        type: ADD_CART_DELETE_WISHLIST_SUCCESS,
        product_id: product_id
    }
}

const addToCartFromWishlist = (product_id) => (dispatch) => {
    dispatch(addToCartdeleteWishlistItemSuccess(product_id))
    axios.post(`${DOMAIN}/api/cart/`, {
        product_id: product_id,
        quantity: 1
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(
        axios.delete(`${DOMAIN}/api/wishlist/`, { headers: {Authorization: "Token "+localStorage.getItem('token')}, data: {product_id:product_id}})
    )
}
const deleteWishlistItemSuccess = (product_id) => {
    return {
        type: DELETE_WISHLIST_SUCCESS,
        product_id: product_id
    }
}
const deleteWishlistItem = (product_id) => (dispatch) => {
    dispatch(deleteWishlistItemSuccess(product_id))
    axios.delete(`${DOMAIN}/api/wishlist/`, { headers: {Authorization: "Token "+localStorage.getItem('token')}, data: {product_id:product_id}})
}
export { fetchWishlistItems }
export { addToCartFromWishlist }
export { deleteWishlistItem }
export { fetchWishlistItemsSuccess }