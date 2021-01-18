import axios from 'axios'
import { FETCH_CART_SUCCESS, UPDATE_CART_SUCCESS, DELETE_CART_SUCCESS, TOGGLE_CART_LOADING } from './types'
import { DOMAIN } from '../../settings'
const fetchCartItemsSuccess = (data) => {
    const obj = {}
    for(let i = 0; i < data.length; i++){obj[data[i].id] = {...data[i]}}
    return {
        type: FETCH_CART_SUCCESS,
        payload: obj
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const fetchCartItems = () => (dispatch) => {
    dispatch({type: TOGGLE_CART_LOADING})
    axios.get(`${DOMAIN}/api/cart/`, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
        dispatch(fetchCartItemsSuccess(res.data))
        dispatch({type: TOGGLE_CART_LOADING})
        }
    )
}
const updateCartItemSuccess = (data) => {
    return {
        type:UPDATE_CART_SUCCESS,
        payload: data
    }
}
const updateCartItems = (product_id, quantity, item_id) => (dispatch) => {
    dispatch(updateCartItemSuccess({item_id, quantity}))
    axios.post(`${DOMAIN}/api/cart/`, {
        product_id: product_id,
        quantity: quantity
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .catch(err=> console.log(err))
}
const deleteCartItemSuccess = (item_id) => {
    return {
        type: DELETE_CART_SUCCESS,
        item_id: item_id
    }
}
const deleteCartItems = (product_id, item_id) => (dispatch) => {
    dispatch(deleteCartItemSuccess(item_id))
    axios.delete(`${DOMAIN}/api/cart/`, { headers: {Authorization: "Token "+localStorage.getItem('token')}, data: {product_id:product_id}})
    .catch(err => console.log(err))

}
export { fetchCartItems }
export { updateCartItems }
export { deleteCartItems }