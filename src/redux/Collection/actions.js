import axios from 'axios'
import { FETCH_COLLECTION_SUCCESS, TOGGLE_COLLECTION_LOADING } from './types'
import { DOMAIN } from '../../settings'
const fetchCollectionProductsSuccess = (data) => {
    // const obj = {}
    // for(let i = 0; i < data.length; i++){obj[data[i].id] = data[i]}
    return {
        type: FETCH_COLLECTION_SUCCESS,
        payload: data
    }
}

const fetchCollectionProducts = () => (dispatch) => {
    dispatch({type:TOGGLE_COLLECTION_LOADING})
    axios.get(`${DOMAIN}/api/products/collection/`)
    .then(res => {
        dispatch(fetchCollectionProductsSuccess(res.data))
        dispatch({type:TOGGLE_COLLECTION_LOADING})
    })
}

export { fetchCollectionProducts }