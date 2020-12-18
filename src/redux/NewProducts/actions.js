import axios from 'axios'
import {FETCH_NEW_PRODUCTS, FETCH_NEW_PRODUCTS_SUCCESS, FETCH_NEW_PRODUCTS_FAIL} from './types'
import { DOMAIN } from '../../settings'
const fetchNewProductsSuccess = (data) => {
    return {
        type: FETCH_NEW_PRODUCTS_SUCCESS,
        payload: data,
    }
}

const fetchNewProducts = () => (dispatch) => {
    axios.get(`${DOMAIN}/api/products/new`)
    .then(res => dispatch(fetchNewProductsSuccess(res.data)))
}

export { fetchNewProducts }