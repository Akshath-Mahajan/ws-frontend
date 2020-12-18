import axios from 'axios'
import { FETCH_CART_SUCCESS, UPDATE_CART_SUCCESS, DELETE_CART_SUCCESS } from './types'
import { DOMAIN } from '../../settings'
const fetchCartItemsSuccess = (data) => {
    const obj = {}
    for(let i = 0; i < data.length; i++){obj[data[i].id] = {...data[i]}}
    return {
        type: FETCH_CART_SUCCESS,
        payload: obj
    }
}
const fetchCartItems = () => (dispatch) => {
    axios.get(`${DOMAIN}/api/cart/`, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
        dispatch(fetchCartItemsSuccess(res.data))
        }
    ) 
}
const updateCartItemSuccess = (data) => {
    return {
        type:UPDATE_CART_SUCCESS,
        payload: data
    }
}
const updateCartItems = (product_id, quantity) => (dispatch) => {
    axios.post(`${DOMAIN}/api/cart/`, {
        product_id: product_id,
        quantity: quantity
    }, {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => dispatch(updateCartItemSuccess(res.data)))
    .catch(err=> console.log(err))
}
const deleteCartItemSuccess = (product_id) => {
    return {
        type: DELETE_CART_SUCCESS,
        product_id: product_id
    }
}
const deleteCartItems = (product_id) => (dispatch) => {
    axios.delete(`${DOMAIN}/api/cart/`, { headers: {Authorization: "Token "+localStorage.getItem('token')}, data: {product_id:product_id}})
    .then(res => dispatch(deleteCartItemSuccess(res.data.id)))
    .catch(err => console.log(err))

}
export { fetchCartItems }
export { updateCartItems }
export { deleteCartItems }