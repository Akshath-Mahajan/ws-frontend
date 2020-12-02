import axios from 'axios'
import { FETCH_COLLECTION_SUCCESS } from './types'

const fetchCollectionProductsSuccess = (data) => {
    // const obj = {}
    // for(let i = 0; i < data.length; i++){obj[data[i].id] = data[i]}
    return {
        type: FETCH_COLLECTION_SUCCESS,
        payload: data
    }
}

const fetchCollectionProducts = () => (dispatch) => {
    axios.get('https://webshopbackendtest.herokuapp.com/api/products/collection/')
    .then(res => dispatch(fetchCollectionProductsSuccess(res.data)))
}

export { fetchCollectionProducts }