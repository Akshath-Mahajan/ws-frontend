import axios from 'axios'
import {FETCH_NEW_PRODUCTS, FETCH_NEW_PRODUCTS_SUCCESS, FETCH_NEW_PRODUCTS_FAIL} from './types'

const fetchNewProductsSuccess = (data) => {
    return {
        type: FETCH_NEW_PRODUCTS_SUCCESS,
        payload: data,
    }
}

const fetchNewProducts = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/products/new')
    .then(res => dispatch(fetchNewProductsSuccess(res.data)))
}

export { fetchNewProducts }