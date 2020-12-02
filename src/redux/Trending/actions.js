import axios from 'axios'
import { FETCH_TRENDING_SUCCESS } from './types'

const fetchTrendingProductsSuccess = (data) => {
    // const obj = {}
    // for(let i = 0; i < data.length; i++){obj[data[i].id] = data[i]}
    return {
        type: FETCH_TRENDING_SUCCESS,
        payload: data
    }
}
const fetchTrendingProducts = () => (dispatch) => {
    axios.get('https://webshopbackendtest.herokuapp.com/api/trending-products/')
    .then(res => dispatch(fetchTrendingProductsSuccess(res.data)))
}

export { fetchTrendingProducts }