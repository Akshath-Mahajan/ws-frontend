import axios from 'axios'
import { FETCH_CART_SUCCESS } from './types'
const fetchCartItemsSuccess = (data) => {
    return {
        type: FETCH_CART_SUCCESS,
        payload: data
    }
}
const fetchCartItems = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/cart/', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
        console.log(res.data)
        dispatch(fetchCartItemsSuccess(res.data))
    }
    ) 
}
export { fetchCartItems }