import axios from 'axios'
import { FETCH_TRENDING_SUCCESS, TOGGLE_TRENDING_LOADING } from './types'
import { DOMAIN } from '../../settings'
const fetchTrendingProductsSuccess = (data) => {
    // const obj = {}
    // for(let i = 0; i < data.length; i++){obj[data[i].id] = data[i]}
    return {
        type: FETCH_TRENDING_SUCCESS,
        payload: data
    }
}
const fetchTrendingProducts = () => (dispatch) => {
    dispatch({type: TOGGLE_TRENDING_LOADING})
    axios.get(`${DOMAIN}/api/trending-products/`)
    .then(res => {
        dispatch(fetchTrendingProductsSuccess(res.data))
        dispatch({type: TOGGLE_TRENDING_LOADING})
        }    
    )
}

export { fetchTrendingProducts }