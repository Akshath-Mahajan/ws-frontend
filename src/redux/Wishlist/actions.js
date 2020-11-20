import axios from 'axios'
import { FETCH_WISHLIST_SUCCESS, ADD_CART_DELETE_WISHLIST_SUCCESS, DELETE_WISHLIST_SUCCESS } from './types'

const fetchWishlistItemsSuccess = (data) => {
    const obj = {}
    for(let i = 0; i < data.length; i++){obj[data[i].id] = {...data[i]}}
    return {
        type: FETCH_WISHLIST_SUCCESS,
        payload: obj
    }
}

const fetchWishlistItems = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/wishlist/', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
            dispatch(fetchWishlistItemsSuccess(res.data.products))
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
    axios.post('http://127.0.0.1:8000/api/cart/', {
        product_id: product_id,
        quantity: 1
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(
        axios.delete('http://127.0.0.1:8000/api/wishlist/', { headers: {Authorization: "Token "+localStorage.getItem('token')}, data: {product_id:product_id}})
        .then(dispatch(addToCartdeleteWishlistItemSuccess(product_id)))
    )
}
const deleteWishlistItemSuccess = (product_id) => {
    return {
        type: DELETE_WISHLIST_SUCCESS,
        product_id: product_id
    }
}
const deleteWishlistItem = (product_id) => (dispatch) => {
    axios.delete('http://127.0.0.1:8000/api/wishlist/', { headers: {Authorization: "Token "+localStorage.getItem('token')}, data: {product_id:product_id}})
    .then(
        dispatch(deleteWishlistItemSuccess(product_id))
    )
}
export { fetchWishlistItems }
export { addToCartFromWishlist }
export { deleteWishlistItem }
export { fetchWishlistItemsSuccess }