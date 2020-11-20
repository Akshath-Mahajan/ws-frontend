import { LOGIN_SUCCESS } from "../User/types";
import { ADD_CART_DELETE_WISHLIST_SUCCESS, DELETE_WISHLIST_SUCCESS, FETCH_WISHLIST_SUCCESS } from "./types";

const initialState = {
    wishlist:{},
    num: 0
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS: return {
            ...state,
            num: action.payload.numOfItemsInWishlist
        }
        case FETCH_WISHLIST_SUCCESS: return {
            ...state,
            wishlist: action.payload,
            num: Object.keys(action.payload).length
        }
        case DELETE_WISHLIST_SUCCESS:
        case ADD_CART_DELETE_WISHLIST_SUCCESS:{ 
            let wl = {...state.wishlist}
            let id = action.product_id
            delete wl[id]
            return {
                ...state,
                wishlist: wl,
                num: state.num - 1
            }
        }
        default: return state
    }
}

export default reducer;