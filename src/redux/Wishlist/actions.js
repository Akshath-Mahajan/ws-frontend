import axios from 'axios'
import {FETCH_WISHLIST_SUCCESS} from './types'
const fetchWishlistItemsSuccess = (data) => {
    return {
        type: FETCH_WISHLIST_SUCCESS,
        payload: data
    }
}
export { fetchWishlistItemsSuccess }

const fetchWishlistItems = () => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/wishlist/', {headers: {Authorization: "Token "+localStorage.getItem('token')}})
    .then(res => {
        console.log(res.data)
        dispatch(fetchWishlistItemsSuccess(res.data.products))
    }
    ) 
}

export { fetchWishlistItems }