import axios from 'axios'
import {FETCH_NEW_PRODUCTS, FETCH_NEW_PRODUCTS_SUCCESS, FETCH_NEW_PRODUCTS_FAIL, TOGGLE_NEW_PRODUCTS_LOADING} from './types'
import { DOMAIN } from '../../settings'
const fetchNewProductsSuccess = (data) => {
    return {
        type: FETCH_NEW_PRODUCTS_SUCCESS,
        payload: data,
    }
}

const fetchNewProducts = () => (dispatch) => {
    dispatch({type: TOGGLE_NEW_PRODUCTS_LOADING})
    axios.get(`${DOMAIN}/api/products/new`)
    .then(res => {
        dispatch(fetchNewProductsSuccess(res.data))
        dispatch({type: TOGGLE_NEW_PRODUCTS_LOADING })
        }    
    )
}

export { fetchNewProducts }